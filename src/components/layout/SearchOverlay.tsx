"use client"

import { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, Sparkles, Monitor, Smartphone, Cpu } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const TRENDING = [
    { label: "RTX 4090 Builds", icon: Monitor },
    { label: "MacBook Pro M3", icon: Smartphone },
    { label: "Gaming Monitors", icon: Monitor },
    { label: "Core i9 14th Gen", icon: Cpu },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-full h-full p-0 m-0 bg-slate-950/95 backdrop-blur-3xl border-none flex flex-col items-center pt-40 overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="w-full max-w-5xl px-4 space-y-12">
          <div className="relative group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 text-slate-700 group-focus-within:text-primary transition-colors" />
            <input 
              ref={inputRef}
              type="text"
              placeholder="Search products, brands or services..."
              className="w-full bg-transparent border-b-4 border-white/5 py-10 pl-20 pr-10 text-4xl md:text-7xl font-black text-white placeholder:text-slate-800 focus:outline-none focus:border-primary transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-xs font-black">
                <TrendingUp className="w-4 h-4" />
                Trending Searches
              </div>
              <div className="grid gap-4">
                {TRENDING.map((item) => (
                  <Link 
                    key={item.label}
                    href={`/products?q=${item.label}`}
                    onClick={onClose}
                    className="group flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tighter uppercase">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-xs font-black">
                <Sparkles className="w-4 h-4" />
                Quick Categories
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Laptops", "Desktops", "Components", "Monitors", "Phones", "Accessories"].map((cat) => (
                  <Link 
                    key={cat}
                    href={`/products?category=${cat.toLowerCase()}`}
                    onClick={onClose}
                    className="p-8 rounded-3xl glass border-white/5 hover:border-primary text-center group transition-all"
                  >
                    <span className="text-sm font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">{cat}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
