import { NextRequest, NextResponse } from "next/server";
import Personalize from "@contentstack/personalize-edge-sdk";
export default async function middleware(req: NextRequest) {
  const projectUid = process.env
    .NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID as string;

  if (process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
    Personalize.setEdgeApiUrl(
      process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL
    );
  }
  await Personalize.init(projectUid, {
    request: req,
  });

  // get the variant parameter from the SDK
  const variantParam = Personalize.getVariantParam();
  const parsedUrl = new URL(req.url);

  // set the variant parameter as a query param in the URL
  parsedUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, variantParam);
  // rewrite the request with the modified URL. you want
  // to serve different content or redirect requests without
  // changing the URL in the browser's address bar.
  const response = NextResponse.rewrite(parsedUrl);

  // add cookies to the response, so we can track the user manisfest
  await Personalize.addStateToResponse(response);

  // Allow iFrames from specific domains
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors https://app.contentstack.com;"
  );

  response.headers.set("x-vercel-protection-bypass", "verified");

  return response;
}
