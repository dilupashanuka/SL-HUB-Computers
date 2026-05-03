'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cpu, ArrowRight } from 'lucide-react';

interface PCSlide {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

export function PCBuilderSlider({ slides }: { slides: PCSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!mounted || !slides || slides.length === 0) return null;

  return (
    <section className="py-20 w-full relative z-20">
      <div className="relative h-[600px] md:h-[800px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Image 
              src={slide.image_url} 
              alt={slide.title} 
              fill 
              sizes="100vw" 
              className="object-cover opacity-75" 
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent" />
            
            <div className="absolute inset-0 flex items-center px-10 md:px-24">
              <div className="max-w-3xl space-y-10">
                <div className="inline-flex items-center gap-4 text-primary">
                  <Cpu className="w-8 h-8" />
                  <span className="text-sm font-black uppercase tracking-[0.5em]">PC Builder Tool</span>
                </div>
                <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none">
                  {slide.title.split(' ').map((word, i) => (
                    <span key={i} className={i === slide.title.split(' ').length - 1 ? 'text-gradient' : ''}>
                      {word}{' '}
                      {i === 1 && <br />}
                    </span>
                  ))}
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">
                  {slide.description}
                </p>
                <Link 
                  href="/pc-builder" 
                  className="inline-flex h-20 items-center px-12 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] rounded-full text-lg shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-105 transition-all active:scale-95"
                >
                  Start Building Now
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-10 right-10 z-20 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-12 h-1.5 rounded-full transition-all duration-500 ${i === current ? 'bg-primary w-20' : 'bg-white/20'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
