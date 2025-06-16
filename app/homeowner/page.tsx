import { setLivePreviewQueryParams, getEntryByUrl } from "../sdk/contentstack";
import { LivePreviewQuery } from "contentstack";
import Header from "../components/Header";
import Script from "next/script";

export default async function Page({ searchParams }: { searchParams: any }) {
  const waitedParams = await searchParams;
  setLivePreviewQueryParams(waitedParams);
  async function fetchData(searchParams: Promise<LivePreviewQuery>) {
    try {
      const result = await getEntryByUrl({
        url: "/",
        contentTypeUid: "page",
        searchParams,
      });
      return result[0];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const data = await fetchData(searchParams);

  return (
    <div className="bg-white">
      <Header announcementReference={""} />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              {data && data[0] ? data[0].banner_text : "Homeowners Welcome!"}
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              {data && data[0] ? data[0].banner_description : "Learn more about homeownership"}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <Script id="tag">
        {`jstag.send({"audience" : "homeowner" , "client_side_sending" : "THIS IS WORKING"}); console.log("Debug Statement");`}
      </Script>
    </div>
  );
}
