"use client";
import { getPersonalizeInstance } from "../context/PersonalizeSDK";

/*
import { useEffect } from "react";

export default function ImpressionTracker({
  variantAlias,
}: {
  variantAlias: any;
}) {
  useEffect(() => {
    getPersonalizeInstance().then((personalize) => {
      console.log("sdk init: ", personalize);
      if (personalize) {
        personalize.triggerImpressions({
          aliases: ["cs_personalize_8_1"],
        }); // Pass the array of aliases
      }
    });
  }, [variantAlias]);

  return null; // this component only exists to track the impression
}
*/

export async function ImpressionTrackerREST({experienceShortUid, variantShortUid}: {experienceShortUid?: string, variantShortUid?: string}) {
  getPersonalizeInstance().then((personalize) => {
    if (personalize) {
      const headers = new Headers();
      const userUID: string = personalize.getUserId() || ""; // Base part of the UID
      if (userUID) {
        headers.append("x-cs-personalize-user-uid", userUID);
        headers.append("x-project-uid", "6734eae6603c9640f5808e78");
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify([
          {
            experienceShortUid: experienceShortUid,
            variantShortUid: variantShortUid,
            type: "IMPRESSION",
          },
        ]);

        const requestOptions: any = {
          method: "POST",
          headers: headers,
          body: body,
          redirect: "follow",
        };

        fetch(
          "https://personalize-edge.contentstack.com/events",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      }
    }
  });

  return null; // this function only exists to track the impression
}
