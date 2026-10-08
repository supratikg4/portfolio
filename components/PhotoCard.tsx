import Image from "next/image";
import type { Photo } from "@/data/photos";

interface PhotoCardProps {
  photo: Photo;
  className?: string;
}

export function PhotoCard({ photo, className = "" }: PhotoCardProps) {
  return (
    <div
      className={`relative overflow-hidden group bg-stone-200 ${className}`}
    >
      <Image
        src={photo.url}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500" />
    </div>
  );
}
