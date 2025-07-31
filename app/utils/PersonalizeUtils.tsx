export function getRandomUUID() {
	const baseUid = "6c3fd942-693f-5f19-a9f7";
	const rand = Math.random().toString(36).substring(2, 10);
	const userUid = `${baseUid}-${rand}`;
	return userUid;
}
