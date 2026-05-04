"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface InventorySlide {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
}

interface InventoryHeaderProps {
  slides: any[];
  settings?: {
    inventory_title?: string;
    inventory_subtitle?: string;
  };
}

export function InventoryHeader({ slides, settings }: InventoryHeaderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const displayTitle = settings?.inventory_title || "Explore Our Premium Inventory";
  const displaySubtitle = settings?.inventory_subtitle || "Find the perfect machine for your needs. We stock only the most reliable brands with guaranteed islandwide warranty.";

  if (!slides || slides.length === 0) {
    return (
      <div className="pt-40 pb-24 relative overflow-hidden">
        <div className="glow-mesh absolute inset-0 opacity-50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-2 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">SL HUB Tech Shop</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              {displayTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              {displaySubtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const activeSlide = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      <div className="pt-40 pb-20 relative z-20 text-center bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-2 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">SL HUB Tech Shop</span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
                {displayTitle}
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                {displaySubtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[50vh] md:h-[65vh] -mt-10 mb-20 px-4 md:px-10">
        <div className="w-full h-full relative rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image 
                src={activeSlide.image_url} 
                alt={activeSlide.title} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          {slides.length > 1 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={cn(
                    "h-1.5 transition-all duration-500 rounded-full",
                    i === currentSlide ? "w-12 bg-primary" : "w-4 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
