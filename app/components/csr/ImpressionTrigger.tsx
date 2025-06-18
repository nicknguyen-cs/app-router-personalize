"use client";

import { useEffect } from "react";
import { getPersonalizeInstance } from "../context/PersonalizeContext";

export default function ImpressionTracker({ variant }: { variant: any }) {
  useEffect(() => {
    console.log("ImpressionTracker Loaded");
    let isMounted = true;
    getPersonalizeInstance().then((personalize) => {
      console.log(personalize);
      if (isMounted && personalize) {
        personalize.triggerImpression(variant); // id might be something like 'homepage_banner'
      }
    });
    return () => {
      isMounted = false;
    };
  }, [variant]);

  return null; // this component only exists to track the impression
}
