"use client";
import { getPersonalizeInstance } from "../../../sdk/PersonalizeSDK";
import { getRandomUUID } from "../utils/PersonalizeUtils";
import { useEffect } from "react";

export default function ImpressionTracker({ variantAlias }: { variantAlias: any }) {
	useEffect(() => {
		getPersonalizeInstance().then(async (personalize) => {
			if (personalize) {
				const result = variantAlias.split(",");
				let userId = personalize.getUserId();
				if (process.env.NEXT_PUBLIC_PERSONALIZE_RANDOM_UIDS === "true")
					userId = getRandomUUID();
				if (!userId) throw new Error("User ID not set in SDK");
				await personalize.setUserId(userId);
				personalize.triggerImpressions({
					aliases: result,
				});
			}
		});
	}, []);

	return null;
}
