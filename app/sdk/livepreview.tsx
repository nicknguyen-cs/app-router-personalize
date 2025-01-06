"use client";
import { useEffect } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { Stack } from "./contentstack";
export default function LivePreviewInitComponent() {
  useEffect(() => {
    ContentstackLivePreview.init({
      stackDetails: {
        apiKey: process.env.NEXT_PUBLIC_CS_API_KEY || "",
        environment: "production",
      },
      mode: "builder",
      ssr: true,
      enable: true
    });
  }, []);
  return <></>;
}
