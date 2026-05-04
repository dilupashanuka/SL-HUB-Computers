"use client"

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Dedupe and filter empty
  const allImages = Array.from(new Set(images.filter(Boolean)));

  if (allImages.length === 0) {
    return (
      <div className="aspect-square rounded-[3rem] bg-[#0a0d14] flex items-center justify-center border border-white/5">
        <ShoppingCart className="w-24 h-24 text-slate-800" />
      </div>
    );
  }

  const prev = () => setActiveIndex(i => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveIndex(i => (i + 1) % allImages.length);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative rounded-[3rem] overflow-hidden bg-[#0a0d14] border border-white/5 group">
        <Image
          key={activeIndex}
          src={allImages[activeIndex]}
          alt={`${title} - image ${activeIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-contain p-10 transition-all duration-500"
          priority
        />

        {/* Navigation arrows - only show if multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/80"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/80"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {/* Dot indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    i === activeIndex ? "bg-primary w-6" : "bg-white/30 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails row */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "aspect-square relative rounded-2xl overflow-hidden border-2 transition-all",
                i === activeIndex
                  ? "border-primary shadow-[0_0_0_2px_rgba(59,130,246,0.3)]"
                  : "border-white/5 hover:border-white/20"
              )}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                sizes="15vw"
                className={cn(
                  "object-contain p-2 transition-opacity",
                  i === activeIndex ? "opacity-100" : "opacity-50 hover:opacity-80"
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
