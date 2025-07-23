"use client";

import { useCallback } from "react";
import { getPersonalizeInstance } from "../../sdk/PersonalizeSDK";
import { getRandomUUID } from "../../utils/PersonalizeUtils";

interface EventTriggerButtonProps {
	eventUID: string;
	children: React.ReactNode;
	domType?: "button" | "a";
	className?: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
	onClick?: () => void;
}

export function EventTriggerButton({
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
			e.preventDefault();
			onClick?.();
			try {
				const personalize = await getPersonalizeInstance();
				if (!personalize) throw new Error("SDK not available");
				let userId = personalize.getUserId();
				if (process.env.NEXT_PUBLIC_PERSONALIZE_RANDOM_UIDS === "true")
					userId = getRandomUUID();
				if (!userId) throw new Error("User ID not set in SDK");
				await personalize.setUserId(userId);
				await personalize.triggerEvent(eventUID);
				onSuccess?.();
			} catch (err) {
				if (err instanceof Error) {
					onError?.(err);
				}
			}
		},
		[eventUID, onClick, onSuccess, onError]
	);

	const commonProps = {
		onClick: handleClick,
		className,
	};

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
