// /components/context/PersonalizeContext.ts
"use client";

import Personalize from "@contentstack/personalize-edge-sdk";
import { Sdk } from "@contentstack/personalize-edge-sdk/dist/sdk";

let sdkInstance: Sdk | null = null;

export async function getPersonalizeInstance() {
  if (!Personalize.getInitializationStatus()) {
    sdkInstance = await Personalize.init(
      process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID || ""
    );
  }
  return sdkInstance;
}
