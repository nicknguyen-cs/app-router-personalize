import contentstack, { LivePreviewQuery, QueryOperation } from "@contentstack/delivery-sdk";
import Personalize from "@contentstack/personalize-edge-sdk";
import { addEditableTags } from "@contentstack/utils";

Personalize.setEdgeApiUrl("https://personalize-edge.contentstack.com");
Personalize.init(process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID || "");
export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CS_API_KEY || "",
  deliveryToken: process.env.NEXT_PUBLIC_CS_DELIVERY_TOKEN || "",
  environment: process.env.NEXT_PUBLIC_CS_ENVIRONMENT || "",
  branch: process.env.NEXT_PUBLIC_CS_BRANCH || "main",
  live_preview: {
    enable: process.env.NEXT_PUBLIC_LIVE_PREVIEW === "true",
    host: "rest-preview.contentstack.com",
    preview_token: process.env.NEXT_PUBLIC_CS_LIVE_PREVIEW_TOKEN || "",
  },
});

export const setLivePreviewQueryParams = (queryParams: any) => {
  if (queryParams?.live_preview) {
    stack.livePreviewQuery(queryParams);
  }
};

export const getEntryByUrl = async ({
  url,
  contentTypeUid,
  variantParam,
  searchParams,
}: {
  url: string;
  contentTypeUid: string;
  variantParam?: any;
  searchParams?: Promise<LivePreviewQuery>; // Ensure searchParams is a Promise
}) => {
  let entry: any;

  const resolvedSearchParams = searchParams ? await searchParams : undefined; // Await searchParams

  if (resolvedSearchParams?.live_preview) {
    stack.livePreviewQuery(resolvedSearchParams);
  }

  entry = await stack
    .contentType(contentTypeUid)
    .entry()
    .query()
    .where("url", QueryOperation.EQUALS, url)
    .find<any>();
  entry = entry.entries;
  if (variantParam) {
    const entryUID = entry[0]?.uid || "";
    const variantAlias = Personalize.variantParamToVariantAliases(variantParam).join(",");
    entry = await stack.contentType(contentTypeUid).entry(entryUID).variants(variantAlias).fetch();
  }
  if (resolvedSearchParams?.live_preview) {
    addEditableTags(entry, contentTypeUid, true, "en-us");
  }
  console.log(entry);
  return entry;
};
