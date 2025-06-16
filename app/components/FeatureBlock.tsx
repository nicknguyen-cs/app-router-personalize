// components/Features.tsx
import { FeatureItem, FeaturesBlock } from '../types/features';

export const Features = ({ title, features, image }: FeaturesBlock) => (
  <section className="py-20 px-6 bg-white border-t border-gray-100">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
      <div className="md:w-1/2">
        <img src={image.url} alt="Features Image" className="rounded-md shadow-sm" />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-2xl font-semibold text-[#2F3542] mb-6">{title}</h2>
        <ul className="space-y-5">
          {features.map((feature : FeatureItem, idx : number) => (
            <li key={idx} className="p-4 bg-[#F0F3F7] rounded shadow-sm">
              <h3 className="font-medium text-[#1e272e]">{feature.title}</h3>
              <p className="text-sm text-[#57606f] mt-1">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
