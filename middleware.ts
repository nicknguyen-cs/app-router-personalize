import { NextRequest, NextResponse } from "next/server";
import Personalize from "@contentstack/personalize-edge-sdk";

export default async function middleware(req: NextRequest) {
  const projectUid = process.env
    .NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID as string;

  if (process.env.NEXT_PUBLIC_PERSONALIZE_EDGE_API_URL) {
    Personalize.setEdgeApiUrl(process.env.NEXT_PUBLIC_PERSONALIZE_EDGE_API_URL);
  }

  const sdk = await Personalize.init(projectUid, {
    request: req,
  });

  // get the variant parameter from the SDK instance
  const variantParam = sdk.getVariantParam();

  const parsedUrl = new URL(req.url);

  // set the variant parameter as a query param in the URL
  parsedUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, variantParam);
  // rewrite the request with the modified URL. you want
  // to serve different content or redirect requests without
  // changing the URL in the browser's address bar.
  const response = NextResponse.rewrite(parsedUrl);

  // add cookies to the response, so we can track the user manifest
  await sdk.addStateToResponse(response);

  return response;
}
