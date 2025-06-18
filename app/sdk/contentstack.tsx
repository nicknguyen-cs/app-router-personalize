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
  branch: process.env.NEXT_PUBLIC_CS_BRANCH || "main",
  live_preview: {
    enable: true,
    host: "rest-preview.contentstack.com",
    preview_token:
      process.env.NEXT_PUBLIC_CS_LIVE_PREVIEW_TOKEN ||
      "csbb8b929bbe3d0b70a54e4a1e",
  },
});

export const setLivePreviewQueryParams = (queryParams: any) => {
  if (queryParams?.live_preview) {
    stack.livePreviewQuery(queryParams);
  }
};

Personalize.setEdgeApiUrl("https://personalize-edge.contentstack.com");
Personalize.init(
  process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID ||
    "6734eae6603c9640f5808e78"
);

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
    await stack.livePreviewQuery(resolvedSearchParams);
  }
  if (variantParam) {
    // convert the variant parameter to variant aliases
    const variantAlias =
      Personalize.variantParamToVariantAliases(variantParam).join(",");
    // pass the variant aliases when fetching the entry
    entry = await stack
      .contentType(contentTypeUid)
      .entry("blt8d012507b4a010d9")
      .includeReference("announcement")
      .variants(variantAlias)
      .fetch();
  } else {
    entry = await stack
      .contentType(contentTypeUid)
      .entry()
      .includeReference("announcement")
      .query()
      .where("url", QueryOperation.EQUALS, url)
      .find<any>();
    entry = entry.entries;
  }
  if (resolvedSearchParams?.live_preview) {
    addEditableTags(entry, contentTypeUid, true, "en-us");
  }
  return entry;
};
