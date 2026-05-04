"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Slide {
  id: string;
  image_url: string;
  video_url?: string;
  title: string;
  subtitle: string;
}

interface HeroProps {
  slides?: Slide[];
  settings?: {
    hero_title?: string;
    hero_subtitle?: string;
    hero_video_url?: string;
  };
}

export function Hero({ slides = [], settings }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!isMounted) return null;

  // No fallback slides needed, the initial one is in DB
  const displaySlides = slides;
  
  const title = settings?.hero_title || 'The New Experience of Technology';
  const subtitle = settings?.hero_subtitle || 'Your trusted partner for high-quality branded computers and professional tech services.';

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-slate-950">
      {/* Background Slides */}
      {displaySlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          {slide.video_url ? (
            <>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover opacity-90 transition-transform duration-[10000ms] ease-out scale-105"
              >
                <source src={slide.video_url} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent z-[1]" />
              <div className="absolute inset-0 bg-slate-950/10 z-[1]" />
            </>
          ) : (
            <>
              <Image
                src={slide.image_url}
                alt="Hero Background"
                fill
                sizes="100vw"
                className="object-cover opacity-90 transition-transform duration-[10000ms] ease-out scale-105"
                priority={index === 0}
              />
              {/* Softened dark gradient for better visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent z-[1]" />
              <div className="absolute inset-0 bg-slate-950/10 z-[1]" />
            </>
          )}
        </div>
      ))}

      {/* Content */}
      <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-4 pt-32 md:pt-28 pb-36 md:pb-24">
        <div className="max-w-4xl space-y-5 md:space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md animate-in fade-in slide-in-from-left-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Live Showroom Experience</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 leading-[1.1] uppercase">
            {title.split(' ').map((word, i) => (
              <span key={i} className={cn(i === 3 ? "text-primary" : "", "inline-block mr-2 md:mr-3")}>
                {word}
              </span>
            ))}
          </h1>

          <p className="max-w-lg text-sm font-medium text-slate-400 md:text-base lg:text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link
              href="/products"
              className="group h-12 md:h-14 inline-flex items-center gap-2 rounded-full bg-primary px-6 md:px-10 text-sm md:text-base font-black text-primary-foreground hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all"
            >
              Explore Shop
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            {settings?.hero_video_url ? (
              <Link
                href={settings.hero_video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 md:h-14 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 md:px-10 text-sm md:text-base font-black text-white backdrop-blur-md hover:bg-white/10 transition-all"
              >
                <Play className="w-4 h-4 fill-current" /> Watch Video
              </Link>
            ) : (
              <Link
                href="/services"
                className="h-12 md:h-14 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 md:px-10 text-sm md:text-base font-black text-white backdrop-blur-md hover:bg-white/10 transition-all"
              >
                PC Build Guide
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-32 md:bottom-24 left-1/2 flex -translate-x-1/2 gap-3 z-20">
          {displaySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-1.5 transition-all duration-300 rounded-full",
                i === currentSlide ? "w-10 bg-primary" : "w-4 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      )}

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
    </section>
  );
}
