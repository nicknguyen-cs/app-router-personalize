"use client";
import { useEffect } from "react";
import { usePersonalize } from "../context/PersonalizeContext";

export default function EventTrigger(variant: any) {
  const Personalize = usePersonalize();

  useEffect(() => {
    async function set() {
      await Personalize?.triggerImpression("6_0");
    }
    set();
  });

  const TriggerEvent = () => {
    Personalize?.triggerEvent("Convert User Group A");
  }

  return (
    <>
      <a href="#" onClick={TriggerEvent} className="action-get-started">
        Get started
      </a>
    </>
  );
}
