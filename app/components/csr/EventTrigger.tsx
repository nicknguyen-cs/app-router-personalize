"use client";

import { useEffect } from "react";
import { getPersonalizeInstance } from "../context/PersonalizeContext";

export default function ImpressionTracker() {
  useEffect(() => {
    getPersonalizeInstance().then((personalize) => {
      console.log(personalize);
      if (personalize) {
        personalize.triggerEvent("Convert User Group A"); // id might be something like 'homepage_banner'
      }
    });
  }, []);

  return null; // this component only exists to track the impression
}
