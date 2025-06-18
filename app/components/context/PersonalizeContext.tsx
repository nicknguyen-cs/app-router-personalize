// /components/context/PersonalizeContext.ts
"use client";

import Personalize from "@contentstack/personalize-edge-sdk";
import { Sdk } from "@contentstack/personalize-edge-sdk/dist/sdk";
import { createContext, useContext, useEffect, useState } from "react";

let sdkInstance: Sdk | null = null;

//SSR
export async function getPersonalizeInstance() {
  if (!Personalize.getInitializationStatus()) {
    sdkInstance = await Personalize.init(
      process.env.NEXT_PUBLIC_CS_PERSONALIZATION_PROJECT_UID || ""
    );
  }
  return sdkInstance;
}

const PersonalizeContext = createContext<Sdk | null>(null);

export function PersonalizeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sdk, setSdk] = useState<Sdk | null>(null);

  useEffect(() => {
    getPersonalizeInstance().then(setSdk);
  }, []);

  return (
    <PersonalizeContext.Provider value={sdk}>
      {children}
    </PersonalizeContext.Provider>
  );
}

//CSR
export function usePersonalize() {
  return useContext(PersonalizeContext);
}
