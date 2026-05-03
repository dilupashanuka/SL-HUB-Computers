"use client"

import { useState } from "react";
import { ChevronDown, Filter, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface ShopSidebarProps {
  currentCategory?: string;
  categories: any[];
}

export function ShopSidebar({ currentCategory, categories }: ShopSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const parentCategories = categories?.filter(c => !c.parent_id) || [];
  const subCategories = categories?.filter(c => c.parent_id) || [];

  return (
    <div className="space-y-10 sticky top-32">
      {/* Category Section */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] flex items-center gap-2">
          <Filter className="w-3 h-3" />
          Filter by Category
        </h3>
        <div className="grid gap-3">
          <a
            href="/products"
            className={cn(
              "flex items-center justify-between p-4 rounded-2xl border transition-all group",
              !currentCategory
                ? "bg-primary/10 border-primary/20 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
            )}
          >
            <span className="text-sm font-bold uppercase tracking-widest">All Items</span>
          </a>

          {parentCategories.map((parent) => {
            const children = subCategories.filter(s => s.parent_id === parent.id);
            const isActive = currentCategory === parent.slug || children.some(c => c.slug === currentCategory);

            return (
              <div key={parent.id} className="space-y-2">
                <a
                  href={`/products?category=${parent.slug}`}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border transition-all group",
                    isActive
                      ? "bg-primary/10 border-primary/20 text-white"
                      : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
                  )}
                >
                  <span className="text-sm font-bold uppercase tracking-widest">{parent.name}</span>
                  {children.length > 0 && <ChevronDown className={cn("w-4 h-4 transition-transform", isActive ? "rotate-180" : "")} />}
                </a>
                
                {children.length > 0 && isActive && (
                  <div className="pl-6 grid gap-2 animate-in slide-in-from-top-2 duration-300">
                    {children.map((child) => (
                      <a
                        key={child.id}
                        href={`/products?category=${child.slug}`}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl border transition-all text-[11px] font-black uppercase tracking-widest",
                          currentCategory === child.slug
                            ? "bg-blue-600/20 border-blue-600/30 text-blue-400"
                            : "bg-white/5 border-white/5 text-slate-500 hover:text-white hover:border-white/10"
                        )}
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="space-y-6 p-8 glass rounded-[2.5rem] border border-white/5">
        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Price Range (LKR)</h3>
        <div className="space-y-6 pt-2">
          <Slider 
            defaultValue={[0, 500000]} 
            max={500000} 
            step={1000} 
            className="text-primary"
            onValueChange={(val) => setPriceRange(val as number[])}
          />
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/5 text-center">
              <span className="text-[10px] text-slate-500 block mb-1">Min</span>
              <span className="text-xs font-bold text-white">Rs. {priceRange[0].toLocaleString()}</span>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/5 text-center">
              <span className="text-[10px] text-slate-500 block mb-1">Max</span>
              <span className="text-xs font-bold text-white">Rs. {priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Filters */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Quick Actions</h3>
        <div className="grid gap-3">
          <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all text-xs font-black uppercase tracking-widest">
            <RotateCcw className="w-4 h-4" />
            Reset All Filters
          </button>
          <div className="p-6 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
            <ShieldCheck className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1">Genuine Gear</h4>
            <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
              Every product undergoes a strict 24-point quality check by our tech experts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
