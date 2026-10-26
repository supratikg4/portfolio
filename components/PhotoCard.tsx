
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "@/data/photos";

interface PhotoCardProps {
  photo: Photo;
  className?: string;
}

export function PhotoCard({ photo, className = "" }: PhotoCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    // Mount first, then animate on the next frame.
    setIsMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true));
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeLightbox = () => {
    setIsVisible(false);
  };

  const handleAnimationEnd = () => {
    if (!isVisible) {
      setIsMounted(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Gallery thumbnail */}
      <button
        type="button"
        onClick={() => {
          setIsMounted(true);
          setIsOpen(true);
        }}
        className={`group block w-full cursor-zoom-in text-left ${className}`}
        aria-label={`Expand photo: ${photo.alt}`}
      >
        <div className="relative overflow-hidden bg-stone-200">
          <img
            src={photo.url}
            alt={photo.alt}
            loading="lazy"
            className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
          />

          <div className="pointer-events-none absolute inset-0 bg-stone-900/0 transition-colors duration-350 group-hover:bg-stone-900/10" />
        </div>
      </button>

      {isMounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 transition-opacity duration-350 ease-out sm:p-8 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={photo.alt}
            onTransitionEnd={(event) => {
              if (
                event.target === event.currentTarget &&
                event.propertyName === "opacity"
              ) {
                handleAnimationEnd();
              }
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeLightbox}
              className={`fixed right-4 top-4 z-[10001] flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-4xl leading-none text-white shadow-lg transition-all duration-350 hover:bg-white/20 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-3 opacity-0"
              }`}
              aria-label="Close enlarged photo"
            >
              &times;
            </button>

            {/* Animated photo */}
            <img
              src={photo.url}
              alt={photo.alt}
              onClick={(event) => event.stopPropagation()}
              className={`relative z-[10000] block h-auto w-auto max-h-[calc(100dvh-8rem)] max-w-[calc(100vw-2rem)] object-contain transition-all duration-350 ease-out sm:max-h-[calc(100dvh-7rem)] sm:max-w-[calc(100vw-4rem)] ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-8 scale-[0.98] opacity-0"
              }`}
            />
          </div>,
          document.body
        )}
    </>
  );
}
