"use client";

import { useEffect } from "react";
import { getPersonalizeInstance } from "../context/PersonalizeSDK";

export default function ImpressionTracker({
  variantAlias,
}: {
  variantAlias: any;
}) {
  useEffect(() => {
    console.log("variantAlias value:", variantAlias);
    console.log(
      "variantAlias type:",
      Array.isArray(variantAlias) ? "array" : typeof variantAlias
    );

    // Ensure variantAlias is an array
    //const aliases = Array.isArray(variantAlias) ? variantAlias : [variantAlias];

    getPersonalizeInstance().then((personalize) => {
      console.log(personalize);
      if (personalize) {
        personalize.triggerImpressions({
          aliases: ["cs_personalize_6_null", "cs_personalize_8_0"],
        }); // Pass the array of aliases
      }
    });
  }, [variantAlias]);

  return null; // this component only exists to track the impression
}

/*
export async function ImpressionTrackerREST({
  experienceUID,
  variantUID,
}: {
  experienceUID: string;
  variantUID: string;
}) {
  const headers = new Headers();
  headers.append(
    "x-cs-personalize-user-uid",
    "12bd8cbd-4dd8-570c-a68c-9be860831941"
  );
  headers.append("x-project-uid", "6734eae6603c9640f5808e78");
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify([
    {
      experienceShortUid: "8",
      variantShortUid: "1",
      type: "IMPRESSION",
    },
  ]);

  const requestOptions: any = {
    method: "POST",
    headers: headers,
    body: body,
    redirect: "follow",
  };

  fetch("https://personalize-edge.contentstack.com/events", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  return null; // this function only exists to track the impression
}
*/