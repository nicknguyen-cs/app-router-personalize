"use client";

import { useCallback } from "react";
import { getPersonalizeInstance } from "../../../sdk/PersonalizeSDK";
import { getRandomUUID } from "../utils/PersonalizeUtils";

interface EventTriggerRestButtonProps {
  eventUID: string;
  children: React.ReactNode;
  className?: string;
  onSuccess?: (result: string) => void;
  onError?: (error: Error) => void;
  onClick?: () => void;
}

export function EventTriggerRestButton({
  eventUID,
  children,
  className,
  onSuccess,
  onError,
  onClick,
}: EventTriggerRestButtonProps) {
  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClick?.();

      try {
        const personalize = await getPersonalizeInstance();
        if (!personalize) throw new Error("Personalize SDK not available");

        let userId = personalize.getUserId();
        if (process.env.NEXT_PUBLIC_PERSONALIZE_RANDOM_UIDS === "true") userId = getRandomUUID();
        if (!userId) throw new Error("User ID not set in SDK");

        const response = await fetch("https://personalize-edge.contentstack.com/events", {
          method: "POST",
          headers: {
            "x-cs-personalize-user-uid": userId,
            "x-project-uid": "6734eae6603c9640f5808e78",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([{ eventKey: eventUID, type: "EVENT" }]),
        });

        const result = await response.text();
        onSuccess?.(result);
      } catch (err) {
        if (err instanceof Error) {
          onError?.(err);
        }
      }
    },
    [eventUID, onClick, onSuccess, onError]
  );

  return (
    <a href="#" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
