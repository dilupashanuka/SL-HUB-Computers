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
}

export function Hero({ slides = [] }: HeroProps) {
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

  // Fallback if no slides
  const displaySlides = slides.length > 0 ? slides : [
    {
      id: '1',
      image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
      title: 'The New Experience of Technology',
      subtitle: 'Your trusted partner for high-quality branded computers and professional tech services.'
    }
  ];

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
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover opacity-40"
            >
              <source src={slide.video_url} type="video/mp4" />
            </video>
          ) : (
            <>
              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                className="object-cover opacity-30"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />
            </>
          )}
        </div>
      ))}

      {/* Content */}
      <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-4">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md animate-in fade-in slide-in-from-left-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">New Arrivals Available</span>
          </div>

          <h1 className="text-6xl font-black tracking-tighter text-white md:text-8xl lg:text-9xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {displaySlides[currentSlide].title.split(' ').map((word, i) => (
              <span key={i} className={i === 3 ? "text-primary block sm:inline" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>

          <p className="max-w-2xl text-lg font-medium text-slate-400 md:text-xl lg:text-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {displaySlides[currentSlide].subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link
              href="/products"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group h-16 rounded-full bg-primary px-10 text-lg font-black text-primary-foreground hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all"
              )}
            >
              Explore Shop
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/services"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-16 rounded-full border-white/10 bg-white/5 px-10 text-lg font-black text-white backdrop-blur-md hover:bg-white/10 transition-all"
              )}
            >
              PC Build Guide
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3 z-20">
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
