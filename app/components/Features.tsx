import type { CSMetadata } from "@/types/types";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

export default function FeatureSection({
  title,
  description,
  group,
  $,
}: {
  title: string;
  description: string;
  group: {
    title: string;
    description: string;
    icon?: React.ElementType;
    uid?: string;
    $?: CSMetadata;
  }[];
  $?: CSMetadata;
}) {
  return (
    <section className="bg-gray-950 text-white py-20 px-6 sm:px-10 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          {...($?.title ?? {})}
        >
          {title}
        </h2>
        <p
          className="mt-4 text-lg text-gray-400"
          {...($?.description ?? {})}
        >
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {group.map(({ title, description, icon: Icon = GlobeAltIcon, uid, $: item$ }, idx) => (
          <div
            key={uid ?? `${title}-${idx}`}
            className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow hover:shadow-lg transition"
            {...(item$?.modular_blocks__parent ?? {})}
          >
            <Icon className="h-8 w-8 text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2" {...(item$?.title ?? {})}>
              {title}
            </h3>
            <p className="text-gray-400 text-sm" {...(item$?.description ?? {})}>
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
