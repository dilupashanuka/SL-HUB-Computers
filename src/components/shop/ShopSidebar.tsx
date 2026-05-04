"use client"

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Filter, RotateCcw, ShieldCheck, ArrowLeft, LayoutGrid, Cpu, Smartphone, Monitor } from "lucide-react";
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
    { id: 'workstations', name: 'Workstations', icon: <Monitor className="w-5 h-5" />, color: 'text-blue-400' },
    { id: 'flagships', name: 'Flagships', icon: <Smartphone className="w-5 h-5" />, color: 'text-purple-400' },
    { id: 'components', name: 'Components', icon: <Cpu className="w-5 h-5" />, color: 'text-emerald-400' },
  ];

  const activeInv = inventories.find(i => i.id === currentInventory);
  const relevantCategories = categories?.filter(c => c.inventory_type === currentInventory && !c.parent_id) || [];

  return (
    <div className="space-y-10 sticky top-32">
      {/* Dynamic Header / Navigation */}
      <div className="space-y-6">
        {!currentInventory ? (
          <>
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] flex items-center gap-2 px-2">
              <LayoutGrid className="w-3 h-3" />
              Select Inventory
            </h3>
            <div className="grid gap-3">
              <Link
                href="/products"
                scroll={false}
                className={cn(
                  "flex items-center justify-between p-5 rounded-2xl border transition-all group",
                  !currentCategory 
                    ? "bg-primary/10 border-primary/20 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
                )}
              >
                <span className="text-xs font-black uppercase tracking-widest">Browse All</span>
              </Link>

              {inventories.map((inv) => (
                <Link
                  key={inv.id}
                  href={`/products?inventory=${inv.id}`}
                  scroll={false}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:border-white/10 hover:text-white transition-all group"
                >
                  <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all group-hover:scale-110", inv.color)}>
                    {inv.icon}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">{inv.name}</span>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="animate-in slide-in-from-left-4 duration-500">
            <Link 
              href="/products" 
              scroll={false}
              className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors mb-6 group px-2"
            >
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              Back to Inventories
            </Link>
            
            <div className="p-6 rounded-[2.5rem] glass border-white/5 mb-8">
              <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4", activeInv?.color)}>
                {activeInv?.icon}
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-1">{activeInv?.name}</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Filter by Brand</p>
            </div>

            <div className="grid gap-2">
              <Link
                href={`/products?inventory=${currentInventory}`}
                scroll={false}
                className={cn(
                  "p-4 px-6 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest",
                  !currentCategory 
                    ? "bg-primary/10 border-primary/20 text-white shadow-lg shadow-primary/10"
                    : "bg-white/5 border-white/5 text-slate-500 hover:text-white hover:border-white/10"
                )}
              >
                All {activeInv?.name}
              </Link>
              
              {relevantCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}&inventory=${currentInventory}`}
                  scroll={false}
                  className={cn(
                    "p-4 px-6 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest flex items-center justify-between group",
                    currentCategory === cat.slug 
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-white/5 border-white/5 text-slate-500 hover:text-white hover:border-white/10"
                  )}
                >
                  {cat.name}
                  <div className={cn("w-1.5 h-1.5 rounded-full transition-all", currentCategory === cat.slug ? "bg-primary scale-100 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-transparent scale-0")} />
                </Link>
              ))}
            </div>
          </div>
        )}
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
          <Link href="/products" scroll={false} className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all text-xs font-black uppercase tracking-widest group">
            <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
            Reset All Filters
          </Link>
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
