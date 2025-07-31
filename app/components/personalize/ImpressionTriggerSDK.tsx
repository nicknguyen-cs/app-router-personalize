"use client";

import { useEffect } from "react";
import { getPersonalizeInstance } from "../../sdk/PersonalizeSDK";
import { getRandomUUID } from "../../utils/PersonalizeUtils";

interface ImpressionTrackerProps {
	variantAlias: string; // Comma-separated string of variant aliases
}

/**
 * ImpressionTriggerComponent
 * This component triggers impression events using the Personalize SDK.
 * It is designed to be reusable and serves as a boilerplate for impression tracking.
 */
export default function ImpressionTriggerSDK({ variantAlias }: ImpressionTrackerProps) {
	useEffect(() => {
		const trackImpressions = async () => {
			try {
				console.log("Setting impressions using the SDK for variantAlias:", variantAlias);

				// Get the Personalize SDK instance
				const personalize = await getPersonalizeInstance();
				if (!personalize) throw new Error("Personalize SDK not available");

				// Get or generate the user ID
				let userId = personalize.getUserId();
				if (process.env.NEXT_PUBLIC_PERSONALIZE_RANDOM_UIDS === "true") {
					userId = getRandomUUID();
				}
				if (!userId) throw new Error("User ID not set in SDK");

				// Set the user ID and trigger impressions
				await personalize.setUserId(userId);
				const aliases = variantAlias.split(",");
				await personalize.triggerImpressions({ aliases });

				console.log("Impressions successfully triggered for aliases:", aliases);
			} catch (error) {
				console.error("Error triggering impressions:", error);
			}
		};

		trackImpressions();
	}, [variantAlias]);

	return null;
}
