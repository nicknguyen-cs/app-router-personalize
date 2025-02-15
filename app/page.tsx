import { Bars3Icon } from "@heroicons/react/24/outline";
import { getEntryByUrl } from "./sdk/contentstack";
import Personalize from "@contentstack/personalize-edge-sdk";
import ResetButton from "./ResetButton";
import Script from "next/script";

const navigationLinks = [
  { name: "Homeowner", href: "/homeowner" },
  { name: "Home", href: "/" },
];

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
  const data = await fetchData(searchParams);
  const announcementText = data?.announcement_text || "";
  const bannerText = data?.banner_text || "";
  const bannerDescription = data?.banner_description || "";

  return (
    <>
      <Script id="lytics">
        {`
        !function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
        jstag.init({
          src: 'https://c.lytics.io/api/tag/fc4a28cd09a9e2cd255c41d24df993b0/latest.min.js',
          pageAnalysis: {
            dataLayerPull: {
              disabled: true
            }
          }
        });
        jstag.pageView();
      `}
      </Script>
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-6 lg:px-8"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            {/* Mobile menu toggle would need client logic if you want interactivity; consider making this a client component. */}
            <div className="flex lg:hidden">
              {/* Without state (useState), this won't open/close. For SSR, you'd need a client wrapper if you want interactive behavior. */}
              {/* Placeholder button; in a purely SSR scenario it won't change state: */}
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigationLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  {item.name}
                </a>
              ))}
              <ResetButton />
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </nav>
          {/* The Dialog component would also need client interactivity. Without `useState`, it won't open or close. 
              If you really need SSR only, consider removing interactive UI or making a client component. */}
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 
              rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 
              sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div
                className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 
                    ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                {...(data?.$ ? data.$.announcement_text : {})}
              >
                {announcementText}
                <a href="#" className="font-semibold text-indigo-600">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1
                {...(data?.$ ? data.$.banner_text : {})}
                className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
              >
                {bannerText}
              </h1>
              <p
                {...(data?.$ ? data.$.banner_description : {})}
                className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8"
              >
                {bannerDescription}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm 
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    focus-visible:outline-indigo-600"
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
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 
              transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%,27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] 
              -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 
              sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
