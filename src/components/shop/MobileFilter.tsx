"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, SlidersHorizontal } from "lucide-react";
import { ShopSidebar } from "./ShopSidebar";

export function MobileFilter({ currentCategory, categories }: { currentCategory?: string; categories: any[] }) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="lg:hidden flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-black uppercase tracking-widest text-white cursor-pointer">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          Filter & Refine
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0 bg-slate-950 border-white/5 overflow-y-auto">
        <div className="p-8">
          <SheetHeader className="mb-10">
            <SheetTitle className="text-2xl font-black text-white tracking-tighter uppercase">Shop Filters</SheetTitle>
          </SheetHeader>
          <ShopSidebar currentCategory={currentCategory} categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
