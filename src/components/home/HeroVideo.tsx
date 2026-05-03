"use client"

import { useRef } from "react";
import { Play, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface HeroVideoProps {
  videos: {
    video_url: string;
    title?: string;
    subtitle?: string;
  }[];
}

export function HeroVideo({ videos }: HeroVideoProps) {
  if (!videos?.length) return null;
  const activeVideo = videos[0];

  return (
    <section className="relative w-full h-[85vh] overflow-hidden bg-slate-950">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full group"
      >
        <video 
          src={activeVideo.video_url} 
          className="w-full h-full object-cover" 
          autoPlay 
          muted 
          loop 
          playsInline 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform cursor-pointer"
          >
            <Play className="w-8 h-8 text-white fill-current ml-1" />
          </motion.div>

          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter max-w-5xl leading-[0.9] mb-6 drop-shadow-2xl"
          >
            {activeVideo.title || "Experience Ultimate Power"}
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-200 text-lg md:text-2xl font-bold uppercase tracking-widest max-w-2xl drop-shadow-lg"
          >
            {activeVideo.subtitle || "The next generation of high-performance computing is here."}
          </motion.p>
        </div>

        <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-center justify-between gap-6 z-10 hidden md:flex">
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3">
               <ShieldCheck className="w-6 h-6 text-blue-500" />
               <span className="text-xs font-black text-white uppercase tracking-widest drop-shadow-md">Certified Hardware</span>
             </div>
             <div className="flex items-center gap-3">
               <Zap className="w-6 h-6 text-purple-500" />
               <span className="text-xs font-black text-white uppercase tracking-widest drop-shadow-md">Max Performance</span>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="h-1.5 w-32 bg-white/20 rounded-full overflow-hidden backdrop-blur-md">
               <motion.div 
                 className="h-full bg-blue-500"
                 initial={{ width: 0 }}
                 whileInView={{ width: "100%" }}
                 transition={{ duration: 10, repeat: Infinity }}
               />
             </div>
             <span className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-md">System Load</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
