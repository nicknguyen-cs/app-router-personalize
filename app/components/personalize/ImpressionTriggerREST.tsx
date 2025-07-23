"use client";
import { getPersonalizeInstance } from "../../sdk/PersonalizeSDK";
import { getRandomUUID } from "../../utils/PersonalizeUtils";
import { useEffect } from "react";

export default function ImpressionTrackerREST({
	experienceShortUid,
	variantShortUid,
}: {
	experienceShortUid?: string;
	variantShortUid?: string;
}) {
	useEffect(() => {
		console.log("Impression being set using the REST API: " + experienceShortUid + "_" + variantShortUid);
		if (!experienceShortUid || !variantShortUid) return;
		getPersonalizeInstance().then((personalize) => {
			if (personalize) {
				let userId = personalize.getUserId();
				if (process.env.NEXT_PUBLIC_PERSONALIZE_RANDOM_UIDS === "true")
					userId = getRandomUUID();
				if (!userId) throw new Error("User ID not set in SDK");
				const url = "https://personalize-edge.contentstack.com/events";
				if (userId) {
					const headers = getHeaders(userId);
					const body = getBody(experienceShortUid, variantShortUid);
					const requestOptions = getRequestOptions(headers, body);
					fetch(url, requestOptions)
						.then((response) => response.text())
						.catch((error) => console.error(error));
				}
			}
		});
	}, [experienceShortUid, variantShortUid]);

	return null;
}

function getRequestOptions(headers: Headers, body: string) {
	const requestOptions: any = {
		method: "POST",
		headers: headers,
		body: body,
		redirect: "follow",
	};
	return requestOptions;
}

function getBody(experienceShortUid: string, variantShortUid: string) {
	return JSON.stringify([
		{
			experienceShortUid: experienceShortUid,
			variantShortUid: variantShortUid,
			type: "IMPRESSION",
		},
	]);
}

function getHeaders(userUID: string) {
	const headers = new Headers();
	headers.append("x-cs-personalize-user-uid", userUID);
	headers.append("x-project-uid", process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID || "");
	headers.append("Content-Type", "application/json");
	return headers;
}
