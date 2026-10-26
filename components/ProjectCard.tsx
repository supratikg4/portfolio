
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
} from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const images = project.images?.length
    ? project.images
    : [project.image];

  const isExternal = project.link.startsWith("http");
  const hasProjectLink =
    project.link.trim() !== "" && project.link !== "#";

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
      }

      if (event.key === "ArrowLeft") {
        setActiveImage((current) =>
          (current - 1 + images.length) % images.length
        );
      }

      if (event.key === "ArrowRight") {
        setActiveImage((current) =>
          (current + 1) % images.length
        );
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    setIsMounted(true);

    const firstFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true));
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length]);

  const openProject = () => {
    setActiveImage(0);
    setIsMounted(true);
    setIsOpen(true);
  };

  const closeProject = () => {
    setIsVisible(false);
  };

  const finishClosing = () => {
    if (!isVisible) {
      setIsMounted(false);
      setIsOpen(false);
    }
  };

  const previousImage = () => {
    setActiveImage(
      (current) => (current - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setActiveImage((current) => (current + 1) % images.length);
  };

  return (
    <>
      {/* Project card */}
      <article className="group">
        <button
          type="button"
          onClick={openProject}
          aria-label={`View details for ${project.title}`}
          className="block w-full text-left"
        >
          <div className="relative mb-6 h-64 w-full overflow-hidden bg-stone-100 sm:h-80">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-stone-900/0 transition-colors duration-500 group-hover:bg-stone-900/10" />
          </div>

          <div className="mb-3 flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
              {project.category}
            </span>

            <ArrowUpRight
              size={20}
              className="text-stone-400 transition-colors group-hover:text-stone-900"
            />
          </div>

          <h2 className="mb-3 font-serif text-2xl font-bold text-stone-900 underline-offset-4 decoration-2 decoration-stone-300 group-hover:underline">
            {project.title}
          </h2>

          <p className="mb-6 font-light leading-relaxed text-stone-600">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((technology) => (
              <span
                key={technology}
                className="rounded-sm border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
              >
                {technology}
              </span>
            ))}
          </div>
        </button>
      </article>

      {/* Project detail popup */}
      {isMounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 transition-opacity duration-[400ms] ease-out sm:p-6 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeProject}
            onTransitionEnd={(event) => {
              if (
                event.target === event.currentTarget &&
                event.propertyName === "opacity"
              ) {
                finishClosing();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} project details`}
          >
            {/* Detail panel */}
            <div
              className={`relative grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-sm bg-[#FDFCF8] shadow-2xl transition-all duration-[400ms] ease-out md:grid-cols-[65fr_35fr] ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-8 scale-[0.98] opacity-0"
              } max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)]`}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={closeProject}
                aria-label="Close project details"
                className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              >
                <X size={21} />
              </button>

              {/* Left: image carousel */}
              <div className="relative flex min-h-0 flex-col bg-stone-950 md:min-h-[560px]">
                <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
                  <Image
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt={`${project.title} screenshot ${activeImage + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-2 sm:p-3"
                    priority
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={previousImage}
                        aria-label="Previous screenshot"
                        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                      >
                        <ArrowLeft size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={nextImage}
                        aria-label="Next screenshot"
                        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Carousel indicators */}
                {images.length > 1 && (
                  <div className="flex shrink-0 items-center justify-center gap-2 px-4 py-4">
                    {images.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`Show screenshot ${index + 1}`}
                        aria-current={
                          activeImage === index ? "true" : undefined
                        }
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeImage === index
                            ? "w-7 bg-white"
                            : "w-1.5 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {images.length === 1 && (
                  <div className="shrink-0 px-5 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Project Preview
                  </div>
                )}
              </div>

              {/* Right: project information */}
              <div className="min-h-0 overflow-y-auto p-6 sm:p-10 md:p-12">
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                  {project.category}
                </span>

                <h2 className="mb-6 pr-8 font-serif text-3xl leading-tight tracking-tight text-stone-900 sm:text-4xl">
                  {project.title}
                </h2>

                <div className="mb-7 h-px w-12 bg-stone-900" />

                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-stone-500">
                  About the project
                </h3>

                <p className="mb-8 whitespace-pre-line text-sm font-light leading-7 text-stone-700 sm:text-base">
                  {project.description}
                </p>

                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-500">
                  Technologies
                </h3>

                <div className="mb-8 flex flex-wrap gap-2">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className="border border-stone-200 bg-white px-3 py-2 text-xs text-stone-700"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {hasProjectLink && (
                  <a
                    href={project.link}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-2 border-b border-stone-900 pb-2 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:text-stone-500"
                  >
                    View project
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
