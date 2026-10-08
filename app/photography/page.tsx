import { photos } from "@/data/photos";
import { PhotoCard } from "@/components/PhotoCard";

export default function PhotographyPage() {
  return (
    <section className="w-full pt-8 pb-32 overflow-hidden bg-[#FDFCF8] animate-page">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 md:mb-20 text-center relative z-20">
        <span className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-4 block">
          Visual Resume
        </span>
        <p className="text-stone-600 max-w-xl mx-auto font-light text-lg">
          Photography shapes how I see the world. It teaches me to observe
          patterns, optimize lighting, and appreciate the underlying
          architecture of a moment—skills that translate directly into elegant
          code.
        </p>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-8">
        {/*<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center pointer-events-none mix-blend-multiply opacity-90 hidden md:block">
          <h1 className="text-[10vw] font-serif tracking-tighter leading-none text-stone-900 whitespace-nowrap">
            SUPRATIK
          </h1>
        </div>

        <div className="mb-12 text-center md:hidden">
          <h1 className="text-6xl font-serif tracking-tighter text-stone-900">
            SUPRATIK
          </h1>
        </div>*/}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-10 relative z-0">
          <div className="flex flex-col gap-4 md:gap-10 md:mt-24">
            <PhotoCard photo={photos[0]} className="aspect-[3/4]" />
            <PhotoCard photo={photos[6]} className="aspect-square" />
          </div>

          <div className="flex flex-col gap-4 md:gap-10 md:-mt-12 z-20">
            <PhotoCard photo={photos[1]} className="aspect-square" />
            <PhotoCard photo={photos[2]} className="aspect-[3/4]" />
          </div>

          <div className="flex flex-col gap-4 md:gap-10 md:mt-48 z-20">
            <PhotoCard photo={photos[3]} className="aspect-[4/5]" />
            <PhotoCard photo={photos[7]} className="aspect-square" />
          </div>

          <div className="flex flex-col gap-4 md:gap-10 md:mt-12">
            <PhotoCard photo={photos[4]} className="aspect-square" />
            <PhotoCard photo={photos[5]} className="aspect-[3/4]" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-32 flex flex-wrap gap-4 justify-center md:justify-start z-20 relative">
        <button className="px-6 py-2 bg-stone-900 text-white text-xs font-bold tracking-widest uppercase">
          OVERVIEW
        </button>
        <button className="px-6 py-2 bg-transparent text-stone-600 border border-stone-300 hover:bg-stone-100 text-xs font-bold tracking-widest uppercase transition-colors">
          LANDSCAPES
        </button>
        <button className="px-6 py-2 bg-transparent text-stone-600 border border-stone-300 hover:bg-stone-100 text-xs font-bold tracking-widest uppercase transition-colors">
          PORTRAITS
        </button>
      </div>
    </section>
  );
}
