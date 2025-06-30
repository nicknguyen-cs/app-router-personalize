import { getEntryByUrl } from "./sdk/Contentstack";
import Personalize from "@contentstack/personalize-edge-sdk";
import Header from "./components/Header";
import Features from "./components/Features";
import ImpressionTrackerSDK from "./components/personalize/helpers/ImpresionTriggerSDK";
import AnnouncementBanner from "./components/AnnouncementBanner";
import Hero from "./components/Hero";

async function fetchData(searchParams: any) {
  const awaitedSearchParams = await searchParams;
  const variantParam = decodeURIComponent(awaitedSearchParams[Personalize.VARIANT_QUERY_PARAM]);
  try {
    const result = await getEntryByUrl({
      url: "/",
      contentTypeUid: "page",
      searchParams: await searchParams,
      variantParam: variantParam,
    });
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function Page({ searchParams }: { searchParams: any }) {
  const awaitedSearchParams = await searchParams;
  const variantParam = decodeURIComponent(awaitedSearchParams[Personalize.VARIANT_QUERY_PARAM]);
  const data = await fetchData(searchParams);
  const modularBlocks = data?.modular_blocks || [];
  const variantParamStrings = Personalize.variantParamToVariantAliases(variantParam).join(",");
  return (
    <div className="bg-gray-50">
      <ImpressionTrackerSDK variantAlias={variantParamStrings} />
      <div>
        <Header />
        <AnnouncementBanner
          announcementReference={{
            message: `Current user manifest → ${variantParamStrings ?? "default"} `,
            status: "info",
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
