"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";

// Full-screen image viewer with keyboard + click navigation.
export function Lightbox({
  photos,
  index,
  alt,
  onClose,
  onIndex,
}: {
  photos: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const go = useCallback(
    (delta: number) => onIndex((index + delta + photos.length) % photos.length),
    [index, photos.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <IconButton label="Close" onClick={onClose} className="absolute right-4 top-4">
        <path d="M6 6l12 12M18 6L6 18" />
      </IconButton>
      <IconButton
        label="Previous photo"
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 md:left-6"
      >
        <path d="M15 6l-6 6 6 6" />
      </IconButton>

      <figure className="relative h-[78vh] w-[92vw] max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <Image src={photos[index]} alt={alt} fill className="object-contain" sizes="92vw" priority />
      </figure>

      <IconButton
        label="Next photo"
        onClick={(e) => { e.stopPropagation(); go(1); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 md:right-6"
      >
        <path d="M9 6l6 6-6 6" />
      </IconButton>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.18em] text-cream/70">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  className = "",
  children,
}: {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
    </button>
  );
}
