"use client";
import { useEffect } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default function LivePreviewInitComponent() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_LIVE_PREVIEW === "true") {
      ContentstackLivePreview.init({
        stackDetails: {
          apiKey: process.env.NEXT_PUBLIC_CS_API_KEY || "",
          environment: "production",
        },
        mode: "builder",
        ssr: true
      });
    }
  }, []);
  return <></>;
}
