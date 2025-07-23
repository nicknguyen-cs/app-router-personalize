import { getEntryByUrl } from "../sdk/ContentstackSDK";
import Personalize from "@contentstack/personalize-edge-sdk";
import Header from "../components/Header";
import Features from "../components/Features";
import ImpressionTrackerSDK from "../components/personalize/ImpresionTriggerSDK";
import AnnouncementBanner from "../components/AnnouncementBanner";
import Hero from "../components/Hero";

async function fetchData(searchParams: any, url: string) {
	const variantParam = decodeURIComponent(searchParams[Personalize.VARIANT_QUERY_PARAM]);
	try {
		const result = await getEntryByUrl({
			url: url,
			contentTypeUid: "page",
			searchParams: await searchParams,
			variantParam: variantParam,
		});
		return result;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

export default async function Page({
	searchParams,
	params,
}: {
	searchParams: Record<string, string>;
	params: any;
}) {
	const url = params?.slug ? `/${params.slug}` : "/";
	let variantParam = decodeURIComponent(searchParams[Personalize.VARIANT_QUERY_PARAM]);
	const data = await fetchData(searchParams, url);
	const modularBlocks = data?.modular_blocks || [];
	const variantParamStrings =
		Personalize.variantParamToVariantAliases(variantParam).join(",");
	return (
		<div className="bg-gray-50">
			<ImpressionTrackerSDK variantAlias={variantParamStrings} />
			<div>
				<Header />
				<AnnouncementBanner
					announcementReference={{
						message: `Manifest → ${variantParam ?? "default"} `,
					}}
				/>
			</div>
			<main>
				{modularBlocks.map((block: any, index: number) => {
					const blockType = Object.keys(block)[0];
					switch (blockType) {
						case "hero":
							return <Hero key={index} {...block.hero} event_uid={"Conversion"} />;
						case "features":
							return <Features key={index} {...block.features} />;
						default:
							return null;
					}
				})}
			</main>
		</div>
	);
}
