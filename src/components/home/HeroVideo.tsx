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
    <section className="py-24 relative overflow-hidden px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/20 group"
        >
          <video 
            src={activeVideo.video_url} 
            className="w-full h-full object-cover" 
            autoPlay 
            muted 
            loop 
            playsInline 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
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
              className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter max-w-4xl leading-[0.9] mb-6"
            >
              {activeVideo.title || "Experience Ultimate Power"}
            </motion.h2>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg md:text-xl font-bold uppercase tracking-widest max-w-2xl"
            >
              {activeVideo.subtitle || "The next generation of high-performance computing is here."}
            </motion.p>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-3">
                 <ShieldCheck className="w-5 h-5 text-blue-500" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Certified Hardware</span>
               </div>
               <div className="flex items-center gap-3">
                 <Zap className="w-5 h-5 text-purple-500" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Max Performance</span>
               </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
               <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-blue-500"
                   initial={{ width: 0 }}
                   whileInView={{ width: "100%" }}
                   transition={{ duration: 10, repeat: Infinity }}
                 />
               </div>
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">System Load</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
