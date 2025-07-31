"use client";

import { useEffect } from "react";
import { getPersonalizeInstance } from "../../sdk/PersonalizeSDK";
import { getRandomUUID } from "../../utils/PersonalizeUtils";

interface ImpressionTrackerRESTProps {
	experienceShortUid?: string;
	variantShortUid?: string;
}

/**
 * ImpressionTrackerREST Component
 * This component triggers impression events using the REST API.
 * It is designed to be reusable and serves as a boilerplate for REST-based impression tracking.
 */
export default function ImpressionTriggerREST({
	experienceShortUid,
	variantShortUid,
}: ImpressionTrackerRESTProps) {
	useEffect(() => {
		const trackImpression = async () => {
			try {
				console.log(
					"Impression being set using the REST API for:",
					`${experienceShortUid}_${variantShortUid}`
				);

				if (!experienceShortUid || !variantShortUid) {
					console.warn("Missing experienceShortUid or variantShortUid");
					return;
				}

				// Get the Personalize SDK instance
				const personalize = await getPersonalizeInstance();
				if (!personalize) throw new Error("Personalize SDK not available");

				// Get or generate the user ID
				let userId = personalize.getUserId();
				if (process.env.NEXT_PUBLIC_PERSONALIZE_RANDOM_UIDS === "true") {
					userId = getRandomUUID();
				}
				if (!userId) throw new Error("User ID not set in SDK");

				// Prepare and send the REST API request
				const url = "https://personalize-edge.contentstack.com/events";
				const headers = getHeaders(userId);
				const body = getBody(experienceShortUid, variantShortUid);
				const requestOptions = getRequestOptions(headers, body);

				fetch(url, requestOptions)
				.then((response) => response.text())
				.catch((error) => console.error(error));				
			} catch (error) {
				console.error("Error triggering impression:", error);
			}
		};

		trackImpression();
	}, [experienceShortUid, variantShortUid]);

	return null;
}

/**
 * Helper function to generate request options for the REST API call.
 */
function getRequestOptions(headers: Headers, body: string) {
	return {
		method: "POST",
		headers,
		body,
		redirect: "follow" as RequestRedirect,
	};
}

/**
 * Helper function to generate the request body for the REST API call.
 */
function getBody(experienceShortUid: string, variantShortUid: string) {
	return JSON.stringify([
		{
			experienceShortUid,
			variantShortUid,
			type: "IMPRESSION",
		},
	]);
}

/**
 * Helper function to generate headers for the REST API call.
 */
function getHeaders(userUID: string) {
	const headers = new Headers();
	headers.append("x-cs-personalize-user-uid", userUID);
	headers.append("x-project-uid", process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID || "");
	headers.append("Content-Type", "application/json");
	return headers;
}
