import { NextRequest, NextResponse } from "next/server";
import Personalize from "@contentstack/personalize-edge-sdk";
import { locationIPMap } from "@/lib/ipConfig";

// Configuration to toggle spoofed IP usage
const USE_SPOOFED_IP = process.env.NEXT_PUBLIC_USE_SPOOFED_IP === "true";

export default async function middleware(req: NextRequest) {
  const projectUid = process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID as string;

  if (!projectUid) {
    console.error("Project UID is missing. Ensure it is set in the environment variables.");
    return NextResponse.next();
  }

  if (process.env.NEXT_PUBLIC_PERSONALIZE_EDGE_API_URL) {
    Personalize.setEdgeApiUrl(process.env.NEXT_PUBLIC_PERSONALIZE_EDGE_API_URL);
  }

  // Determine whether to use a spoofed IP or the original request
  const headers = new Headers(req.headers);
  if (USE_SPOOFED_IP) {
    const spoofedIP = locationIPMap["us"]; // Example: Using "jp" as the spoofed location
    headers.set("x-forwarded-for", spoofedIP);
  }

  // Add project UID and personalize user UID to headers
  const personalizeUID = req.cookies.get("cs-personalize-user-uid");
  headers.set("x-project-uid", projectUid);
  headers.set("x-personalize-user-uid", personalizeUID?.value || "");

  // Create a modified request only if spoofed IP is used
  const requestToUse = USE_SPOOFED_IP
    ? new Request(req.url, {
        method: req.method,
        headers,
        body: req.body,
        redirect: req.redirect,
      })
    : req;

  // Initialize the Personalize SDK
  const sdk = await Personalize.init(projectUid, {
    request: requestToUse,
  });

  // Get the variant parameter from the SDK
  const variantParam = sdk.getVariantParam();
  const parsedUrl = new URL(req.url);

  // Add the variant parameter as a query param in the URL
  parsedUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, variantParam);

  // Rewrite the request with the modified URL
  const response = NextResponse.rewrite(parsedUrl);

  // Add cookies or state to the response
  await sdk.addStateToResponse(response);

  return response;
}
