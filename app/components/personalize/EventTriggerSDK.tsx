"use client";

import { useCallback } from "react";
import { getPersonalizeInstance } from "../../sdk/PersonalizeSDK";
import { getRandomUUID } from "../../utils/PersonalizeUtils";

interface EventTriggerButtonProps {
  eventUID: string;
  children: React.ReactNode;
  domType?: "button" | "a"; // Determines whether the component renders as a <button> or <a>
  className?: string;
  onSuccess?: () => void; // Callback for successful event trigger
  onError?: (error: Error) => void; // Callback for error handling
  onClick?: () => void; // Callback for additional click handling
}

/**
 * EventTriggerButton Component
 * This component triggers an event using the Personalize SDK.
 * It is designed to be reusable and serves as a boilerplate for event handling.
 */
export function EventTriggerSDKButton({
  eventUID,
  children,
  domType: as = "button",
  className = "",
  onSuccess,
  onError,
  onClick,
}: EventTriggerButtonProps) {
  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.preventDefault(); // Prevent default behavior for <a> or <button>
      onClick?.(); // Call the optional onClick callback

      try {
        // Get the Personalize SDK instance
        const personalize = await getPersonalizeInstance();
        if (!personalize) throw new Error("Personalize SDK not available");

        // Get or generate the user ID
        let userId = personalize.getUserId();
        if (process.env.NEXT_PUBLIC_PERSONALIZE_RANDOM_UIDS === "true") {
          userId = getRandomUUID();
        }
        if (!userId) throw new Error("User ID not set in SDK");

        // Set the user ID and trigger the event
        await personalize.setUserId(userId);
        await personalize.triggerEvent(eventUID);

        // Call the success callback
        onSuccess?.();
      } catch (err) {
        if (err instanceof Error) {
          // Call the error callback
          onError?.(err);
        }
      }
    },
    [eventUID, onClick, onSuccess, onError]
  );

  // Common props for both <button> and <a>
  const commonProps = {
    onClick: handleClick,
    className,
  };

  // Render as <a> or <button> based on the domType prop
  return as === "a" ? (
    <a href="#" {...commonProps}>
      {children}
    </a>
  ) : (
    <button type="button" {...commonProps}>
      {children}
    </button>
  );
}
