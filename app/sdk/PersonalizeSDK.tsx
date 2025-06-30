// /components/context/PersonalizeContext.ts
"use client";

import Personalize from "@contentstack/personalize-edge-sdk";
import { Sdk } from "@contentstack/personalize-edge-sdk/dist/sdk";
let personalizeSDK: Sdk | null = null;

export async function getPersonalizeInstance() {
  if (!Personalize.getInitializationStatus()) {
    Personalize.setEdgeApiUrl("https://personalize-edge.contentstack.com");
    personalizeSDK = await Personalize.init(process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID || "");
  }
  return personalizeSDK;
}
