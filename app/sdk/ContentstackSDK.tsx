import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
import Personalize from "@contentstack/personalize-edge-sdk";
import { addEditableTags } from "@contentstack/utils";

// Initialize Personalize SDK
const PERSONALIZATION_PROJECT_UID = process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID || "";
const PERSONALIZE_EDGE_API_URL = process.env.NEXT_PUBLIC_PERSONALIZE_EDGE_API_URL || "https://personalize-edge.contentstack.com";

Personalize.setEdgeApiUrl(PERSONALIZE_EDGE_API_URL);
Personalize.init(PERSONALIZATION_PROJECT_UID);

// Initialize Contentstack Stack
export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CS_API_KEY || "",
  deliveryToken: process.env.NEXT_PUBLIC_CS_DELIVERY_TOKEN || "",
  environment: process.env.NEXT_PUBLIC_CS_ENVIRONMENT || "",
  branch: process.env.NEXT_PUBLIC_CS_BRANCH || "main",
  live_preview: {
    enable: process.env.NEXT_PUBLIC_LIVE_PREVIEW === "true",
    host: process.env.NEXT_PUBLIC_LIVE_PREVIEW || "rest-preview.contentstack.com",
    preview_token: process.env.NEXT_PUBLIC_CS_LIVE_PREVIEW_TOKEN || "",
  },
});

// Fetch entry by URL with optional personalization
export const getEntryByUrl = async ({
  url,
  contentTypeUid,
  variantParam,
  searchParams,
}: {
  url: string;
  contentTypeUid: string;
  variantParam?: string;
  searchParams?: any;
}) => {
  let entry: any;

  // Resolve search parameters
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  // Apply live preview query if enabled
  if (resolvedSearchParams?.live_preview) {
    stack.livePreviewQuery(resolvedSearchParams);
  }

  // Fetch entry by URL first
  const response = await stack
    .contentType(contentTypeUid)
    .entry()
    .query()
    .where("url", QueryOperation.EQUALS, url)
    .find<any>();
  entry = response.entries;

  // Handle personalization if variantParam is provided
  if (variantParam) {
    const entryUID = entry[0]?.uid || "";
    const variantAlias = Personalize.variantParamToVariantAliases(variantParam).join(",");
    entry = await stack
      .contentType(contentTypeUid)
      .entry(entryUID)
      .variants(variantAlias)
      .fetch();
  }

  // Add editable tags for live preview
  if (resolvedSearchParams?.live_preview) {
    addEditableTags(entry, contentTypeUid, true, "en-us");
  }

  return entry;
};
