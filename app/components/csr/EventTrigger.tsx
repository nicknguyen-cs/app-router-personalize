"use client";

import { useEffect } from "react";
import { getPersonalizeInstance } from "../context/PersonalizeSDK";

export default function ImpressionTracker() {
  useEffect(() => {
    getPersonalizeInstance().then((personalize) => {
      if (personalize) {
        console.log("SDK Init: ", personalize);
        //personalize.triggerEvent("Convert User Group A"); // id might be something like 'homepage_banner'
      }
    });
  }, []);

  return (
    <a href="#" className="action-get-started">
      Get started
    </a>
  ); // this component only exists to track the impression
}
