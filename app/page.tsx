import { getEntryByUrl } from "./sdk/contentstack";
import Personalize from "@contentstack/personalize-edge-sdk";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Hero from "./components/Hero";
import { Features } from "./components/FeatureBlock";
import { ImpressionTrackerREST } from "./components/csr/ImpressionTrigger";

async function fetchData(searchParams: any) {
  const awaitedSearchParams = await searchParams;
  const variantParam = decodeURIComponent(
    awaitedSearchParams[Personalize.VARIANT_QUERY_PARAM]
  );
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
  const variantParam = decodeURIComponent(
    awaitedSearchParams[Personalize.VARIANT_QUERY_PARAM]
  );

  // Split variantParam into individual sets and filter out "null"
  const validVariant = variantParam
    .split(",")
    .find((set) => !set.includes("null"));

  if (!validVariant) {
    console.error("No valid variant found");
    return null;
  }

  // Split the valid variant into experienceUid and variantId
  const [experienceUid, variantId] = validVariant.split("_");
  console.log("Experience UID:", experienceUid);
  console.log("Variant ID:", variantId);
  let eventGroup: string = "";
  switch (variantId) {
    case "0":
      eventGroup = "Convert User Group A";
      break;
    case "1":
      eventGroup = "Convert User Group B";
      break;
    case "2":
      eventGroup = "Convert User Group C";
      break;
  }

  const data = await fetchData(searchParams);
  const announcementText = data?.announcement_text || "";
  const bannerText = data?.banner_text || "";
  const bannerDescription = data?.banner_description || "";
  const modularBlocks = data?.modular_blocks || [];

  return (
    <div className="bg-gray-50">
      <ImpressionTrackerREST
        experienceShortUid={experienceUid}
        variantShortUid={variantId}
      />
      <div className="mb-2">
        {" "}
        {/* Add spacing below Header */}
        <Header announcementReference={"25%"} />
      </div>
      <div className="mb-2">
        {" "}
        {/* Add spacing below Banner */}
        <Banner
          announcementText={announcementText}
          bannerText={bannerText}
          bannerDescription={bannerDescription}
          data={data}
          eventGroup={eventGroup}
        />
      </div>
      <main>
        {modularBlocks.map((block: any, index: number) => {
          const blockType = Object.keys(block)[0];
          switch (blockType) {
            case "hero":
              return <Hero key={index} {...block.hero} />;
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
