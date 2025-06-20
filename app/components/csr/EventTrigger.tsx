"use client";
import { getPersonalizeInstance } from "../context/PersonalizeSDK";

export function EventTriggerREST({
  eventUID,
  buttonTitle,
}: {
  eventUID?: string;
  buttonTitle?: string;
}) {
  const sendEvent = () => {
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
              eventKey: eventUID,
              type: "EVENT",
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
  };

  return (
    <>
      <a href="#" className="action-get-started" onClick={sendEvent}>
        {buttonTitle}
      </a>
    </>
  ); // this function only exists to track the impression
}
