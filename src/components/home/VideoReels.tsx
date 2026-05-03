"use client"

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Reel {
  id: string;
  video_url: string;
  title: string;
  category: string;
}

export function VideoReels({ reels = [] }: { reels: Reel[] }) {
  if (reels.length === 0) return null;

  return (
    <section className="py-40 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 mb-20">
        <div className="flex items-end justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Build Showcase</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Tech <span className="text-gradient">Reels</span></h2>
          </div>
          <button className="hidden md:flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all group">
            Watch More
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto px-[calc(50vw-640px)] pb-10 no-scrollbar snap-x scroll-px-4">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-[280px] md:w-[320px] aspect-[9/16] shrink-0 snap-start relative rounded-[2.5rem] overflow-hidden group border border-white/5 bg-slate-900 shadow-2xl">
      <video
        ref={videoRef}
        src={reel.video_url}
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        loop
        muted={isMuted}
        playsInline
        onMouseEnter={() => {
            videoRef.current?.play();
            setIsPlaying(true);
        }}
        onMouseLeave={() => {
            videoRef.current?.pause();
            setIsPlaying(false);
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
      
      {/* Controls */}
      <div className="absolute top-6 right-6 flex flex-col gap-3">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Info */}
      <div className="absolute bottom-8 left-8 right-8">
        <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 block">{reel.category}</span>
        <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{reel.title}</h3>
      </div>

      {/* Play Icon (Visible when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-600/30 flex items-center justify-center text-white">
            <Play className="w-6 h-6 fill-white" />
          </div>
        </div>
      )}
    </div>
  );
}
