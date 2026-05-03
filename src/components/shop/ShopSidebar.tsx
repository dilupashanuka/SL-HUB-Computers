"use client"

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Filter, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface ShopSidebarProps {
  currentCategory?: string;
  categories: any[];
}

export function ShopSidebar({ currentCategory, categories }: ShopSidebarProps) {
  const searchParams = useSearchParams();
  const currentInventory = searchParams.get('inventory');
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const inventories = [
    { id: 'workstations', name: 'Workstations', icon: '💻' },
    { id: 'flagships', name: 'Flagships', icon: '📱' },
    { id: 'components', name: 'Components', icon: '🛠️' },
  ];

  return (
    <div className="space-y-10 sticky top-32">
      {/* Inventory Selection */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] flex items-center gap-2">
          <Filter className="w-3 h-3" />
          Main Inventories
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
            <span className="text-sm font-bold uppercase tracking-widest">All Inventory</span>
          </a>

          {inventories.map((inv) => {
            const invCats = categories?.filter(c => c.inventory_type === inv.id && !c.parent_id) || [];
            
            return (
              <div key={inv.id} className="space-y-3">
                <a
                  href={`/products?inventory=${inv.id}`}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border transition-all group",
                    currentInventory === inv.id
                      ? "bg-primary/10 border-primary/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                      : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
                  )}
                >
                  <span className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="text-lg">{inv.icon}</span> {inv.name}
                  </span>
                </a>
                
                <div className="pl-4 grid gap-2">
                  {invCats.map((cat) => {
                    const children = categories?.filter(c => c.parent_id === cat.id) || [];
                    const isActive = currentCategory === cat.slug || children.some(c => c.slug === currentCategory);
                    
                    return (
                      <div key={cat.id} className="space-y-1">
                        <a
                          href={`/products?category=${cat.slug}`}
                          className={cn(
                            "flex items-center justify-between p-3 px-4 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-widest",
                            isActive
                              ? "bg-primary/10 border-primary/20 text-white"
                              : "bg-white/5 border-white/5 text-slate-500 hover:text-white hover:border-white/10"
                          )}
                        >
                          {cat.name}
                          {children.length > 0 && <ChevronDown className={cn("w-3 h-3 transition-transform", isActive ? "rotate-180" : "")} />}
                        </a>
                        
                        {isActive && children.length > 0 && (
                          <div className="pl-4 grid gap-1 animate-in slide-in-from-top-2 duration-300">
                            {children.map(child => (
                              <a
                                key={child.id}
                                href={`/products?category=${child.slug}`}
                                className={cn(
                                  "p-2 px-4 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all border",
                                  currentCategory === child.slug
                                    ? "bg-blue-600/20 border-blue-600/30 text-blue-400"
                                    : "bg-transparent border-transparent text-slate-600 hover:text-slate-400"
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
