import Contentstack, { LivePreviewQuery } from "contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import Personalize from "@contentstack/personalize-edge-sdk";
import { addEditableTags } from "@contentstack/utils";

export const Stack = Contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CS_API_KEY || "",
  delivery_token: process.env.NEXT_PUBLIC_CS_DELIVERY_TOKEN || "",
  environment: process.env.NEXT_PUBLIC_CS_ENVIRONMENT || "",
  live_preview: {
    preview_token: process.env.NEXT_PUBLIC_CS_LIVE_PREVIEW_TOKEN || "",
    enable: true,
    host: "rest-preview.contentstack.com",
  },
});

export const { onEntryChange } = ContentstackLivePreview;

export const setLivePreviewQueryParams = (queryParams: any) => {
  if (queryParams?.live_preview) {
    Stack.livePreviewQuery(queryParams);
  }
};
Personalize.setEdgeApiUrl("https://personalize-edge.contentstack.com");
Personalize.init(process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID || "");

export const getEntryByUrl = async ({
  url,
  contentTypeUid,
  variantParam,
  searchParams,
}: {
  url: string;
  contentTypeUid: string;
  variantParam?: any;
  searchParams?: LivePreviewQuery;
}) => {
  let entry;
  if (searchParams) {
    Stack.livePreviewQuery(searchParams);
  }
  const req = Stack.ContentType(contentTypeUid).Query().where("url", url);
  if (variantParam) {
    // convert the variant parameter to variant aliases
    const variantAlias = Personalize.variantParamToVariantAliases(variantParam).join(",");
    // pass the variant aliases when fetching the entry
    entry = await Stack.ContentType(contentTypeUid)
      .Entry("blt8d012507b4a010d9")
      .variants(variantAlias)
      .toJSON()
      .fetch();
  } else {
    // fetch the entry without the variant aliases
    entry = await req.toJSON().find();
  }
  if (searchParams) addEditableTags(entry, contentTypeUid, true, "en-us");
  return entry;
};
