import { getEntryByUrl } from "../sdk/ContentstackSDK";
import Personalize from "@contentstack/personalize-edge-sdk";
import Header from "../components/Header";
import Features from "../components/Features";
import AnnouncementBanner from "../components/AnnouncementBanner";
import Hero from "../components/Hero";
import ImpressionTriggerSDK from "../components/personalize/ImpressionTriggerSDK";
import ImpressionTriggerREST from "../components/personalize/ImpressionTriggerREST";

interface FetchDataParams {
	searchParams: any;
	url: string;
}

/**
 * Fetch data for the page using Contentstack SDK and Personalize SDK.
 */
async function fetchData({ searchParams, url }: FetchDataParams) {
	const resolvedSearchParams = await searchParams;
	const variantParam = decodeURIComponent(
		resolvedSearchParams[Personalize.VARIANT_QUERY_PARAM]
	);

	try {
		const result = await getEntryByUrl({
			url,
			contentTypeUid: "page",
			searchParams: resolvedSearchParams,
			variantParam,
		});
		return result;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
}

/**
 * Render modular blocks dynamically based on their type.
 */
function renderBlock(blockType: string, block: any, index: number) {
	switch (blockType) {
		case "hero":
			return <Hero key={index} {...block.hero} event_uid={"Conversion"} />;
		case "features":
			return <Features key={index} {...block.features} />;
		default:
			console.warn(`Unknown block type: ${blockType}`);
			return null;
	}
}

/**
 * Page Component
 * This component renders the page content, including modular blocks and impression tracking.
 */
export default async function Page({
	searchParams,
	params,
}: {
	searchParams: any;
	params: any;
}) {
	const resolvedSearchParams = await searchParams;
	const resolvedParams = await params;

	const url = resolvedParams?.slug ? `/${resolvedParams.slug}` : "/";
	const variantParam = decodeURIComponent(
		resolvedSearchParams[Personalize.VARIANT_QUERY_PARAM]
	);

	const data = await fetchData({ searchParams: resolvedSearchParams, url });
	const modularBlocks = data?.modular_blocks || [];
	const variantParamStrings =
		Personalize.variantParamToVariantAliases(variantParam).join(",");
	const useSDK = process.env.NEXT_PUBLIC_USE_SDK === "true";
	const variantString = variantParam.split(",").find((str) => str.split("_")[1] !== "null");
	const variantExperience = variantString?.split("_") || [];

	return (
		<div className="bg-gray-50">
			{/* Impression Tracker */}
			{useSDK ? (
				<ImpressionTriggerSDK variantAlias={variantParamStrings} />
			) : (
				<ImpressionTriggerREST
					experienceShortUid={variantExperience[0]}
					variantShortUid={variantExperience[1]}
				/>
			)}
			<div>
				<Header />
				<AnnouncementBanner
					announcementReference={{
						message: `Manifest → ${variantParam ?? "default"} `,
					}}
				/>
			</div>

			{/* Main Content */}
			<main>
				{modularBlocks.map((block: any, index: number) => {
					const blockType = Object.keys(block)[0];
					return renderBlock(blockType, block, index);
				})}
			</main>
		</div>
	);
}
