"use client";
import { useEffect } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default function LivePreviewInitComponent() {
  useEffect(() => {
      ContentstackLivePreview.init({
        stackDetails: {
          apiKey: process.env.NEXT_PUBLIC_CS_API_KEY || "blt63d4ae319e4ee4e7",
          environment: "production",
        },
        mode: "builder",
        ssr: true
      });
  }, []);
  return <></>;
}
