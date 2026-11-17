"use client";

import { useEffect, useState } from "react";
import { photos } from "@/data/photos";
import { PhotoCard } from "@/components/PhotoCard";

type Orientation = "portrait" | "landscape";

export default function PhotographyPage() {
  const [orientations, setOrientations] = useState<
    Record<number, Orientation>
  >({});

  useEffect(() => {
    let cancelled = false;

    async function detectOrientations() {
      const results = await Promise.all(
        photos.map(
          (photo) =>
            new Promise<[number, Orientation]>((resolve) => {
              const image = new window.Image();

              image.onload = () => {
                resolve([
                  photo.id,
                  image.naturalWidth > image.naturalHeight
                    ? "landscape"
                    : "portrait",
                ]);
              };

              image.onerror = () => resolve([photo.id, photo.aspect]);
              image.src = photo.url;
            })
        )
      );

      if (!cancelled) {
        setOrientations(Object.fromEntries(results));
      }
    }

    detectOrientations();

    return () => {
      cancelled = true;
    };
  }, []);

  // Each column tracks its own vertical position.
  // Landscape photos occupy two columns but advance the
  // vertical position of their starting column only.
  const columns: { photo: (typeof photos)[number]; span: number }[][] = [
    [],
    [],
    [],
    [],
  ];

  const columnHeights = [0, 0, 0, 0];

  for (const photo of photos) {
    const span = orientations[photo.id] === "landscape" ? 3.5 : 1;

    let targetColumn = 0;
    let bestHeight = Infinity;

    for (let col = 0; col <= 4 - span; col++) {
      const height = Math.max(
        ...columnHeights.slice(col, col + span)
      );

      if (height < bestHeight) {
        bestHeight = height;
        targetColumn = col;
      }
    }

    columns[targetColumn].push({ photo, span });

    // The image's aspect ratio determines its rendered height.
    // This estimate is used only for assignment to a column.
    const width = 100 / 4 * span;
    const estimatedHeight =
      width *
      (orientations[photo.id] === "landscape" ? 0.65 : 1.5);

    columnHeights[targetColumn] += estimatedHeight;

    if (span === 2) {
      columnHeights[targetColumn + 1] += estimatedHeight;
    }
  }

  return (
    <section className="w-full pt-8 pb-32 bg-[#FDFCF8] animate-page">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 md:mb-20 text-center relative z-20">
        <span className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-4 block">
          Visual Resume
        </span>

        <p className="text-stone-600 max-w-xl mx-auto font-light text-lg">
          "Start taking photos. It might not change the world, but it'll change yours."
          <br />
          <i>- Me, circa right now</i>
        </p>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 lg:gap-x-10">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex min-w-0 flex-col gap-4 md:gap-6 lg:gap-10 ${
                columnIndex === 0
                  ? "md:mt-24"
                  : columnIndex === 1
                    ? "md:-mt-12"
                    : columnIndex === 2
                      ? "md:mt-48"
                      : "md:mt-12"
              }`}
            >
              {column.map(({ photo, span }) => (
                <div
                  key={photo.id}
                  className={`min-w-0 ${
                    span === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <PhotoCard photo={photo} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}