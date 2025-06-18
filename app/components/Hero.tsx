// components/Hero.tsx
import { HeroType } from "../types/herotype";

const Hero = ({ title, subtitle }: HeroType) => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[50vh] flex items-center justify-center text-white overflow-hidden mt-3"
  
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* Overlay */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-4xl font-bold drop-shadow">{title}</h1>
        <p className="mt-4 text-lg drop-shadow">{subtitle}</p>
        <a
          href={''}
          className="mt-6 inline-block bg-[#47CDFF] text-white text-sm px-5 py-2 rounded-md hover:bg-[#36bde6] transition"
        >
          Placeholder
        </a>
      </div>
    </section>
  );
};

export default Hero;
