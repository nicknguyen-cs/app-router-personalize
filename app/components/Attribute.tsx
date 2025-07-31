"use client";

import { useEffect } from "react";
import { getPersonalizeInstance } from "../sdk/PersonalizeSDK";

/**
 * Attribute Component
 * This component initializes and sets attributes for the Personalize SDK.
 * It is designed to be reusable and serves as a boilerplate for attribute handling.
 */
export default function Attribute() {
    useEffect(() => {
        (async () => {
            try {
                // Get the Personalize SDK instance
                const personalizeSDK = await getPersonalizeInstance();

                // Check if the SDK is initialized
                if (!personalizeSDK) {
                    console.error("Personalize SDK not initialized");
                    return;
                }

                // Set attributes for personalization
                personalizeSDK.set({
                    // Example attributes
                    attributeKey1: "attributeValue1",
                    attributeKey2: "attributeValue2",
                });
            } catch (error) {
                console.error("Error initializing Personalize SDK:", error);
            }
        })();
    }, []);

    return null;
}
