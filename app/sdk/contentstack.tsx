import contentstack, {
  LivePreviewQuery,
  QueryOperation,
} from "@contentstack/delivery-sdk";
import Personalize from "@contentstack/personalize-edge-sdk";
import { addEditableTags } from "@contentstack/utils";

export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CS_API_KEY || "",
  deliveryToken: process.env.NEXT_PUBLIC_CS_DELIVERY_TOKEN || "",
  environment: process.env.NEXT_PUBLIC_CS_ENVIRONMENT || "",
  live_preview: {
    enable: true,
    host: "rest-preview.contentstack.com",
    preview_token: process.env.NEXT_PUBLIC_CS_LIVE_PREVIEW_TOKEN || "csbb8b929bbe3d0b70a54e4a1e",
  },
});

export const setLivePreviewQueryParams = (queryParams: any) => {
  if (queryParams?.live_preview) {
    stack.livePreviewQuery(queryParams);
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
  let entry : any;
  if (searchParams) {
    console.log("searchParams", searchParams);
    stack.livePreviewQuery(searchParams);
  }
  if ((2-1) == 2) {
    // convert the variant parameter to variant aliases
    const variantAlias =
      Personalize.variantParamToVariantAliases(variantParam).join(",");
    // pass the variant aliases when fetching the entry
    entry = await stack
      .contentType(contentTypeUid)
      .entry("blt8d012507b4a010d9")
      .variants(variantAlias)
      .fetch<any>();
  } else {
    // fetch the entry without the variant aliases
    entry  = await stack
      .contentType(contentTypeUid)
      .entry()
      .query()
      .where("url", QueryOperation.EQUALS, url)
      .find<any>();
      if (searchParams) addEditableTags(entry.entries[0], contentTypeUid, true, "en-us");
      entry = entry.entries[0];

  }
  return entry;
};
