"use client";

import { useEffect } from "react";
import { getPersonalizeInstance } from "../context/PersonalizeContext";

export default function ImpressionTracker({ variantAlias }: { variantAlias: any }) {
  useEffect(() => {
    console.log("variantAlias value:", variantAlias);
    console.log("variantAlias type:", Array.isArray(variantAlias) ? "array" : typeof variantAlias);

    // Ensure variantAlias is an array
    //const aliases = Array.isArray(variantAlias) ? variantAlias : [variantAlias];

    getPersonalizeInstance().then((personalize) => {
      console.log(personalize);
      if (personalize) {
        personalize.triggerImpressions({ aliases : ['cs_personalize_6_null','cs_personalize_8_0'] }); // Pass the array of aliases
      }
    });
  }, [variantAlias]);

  return null; // this component only exists to track the impression
}
