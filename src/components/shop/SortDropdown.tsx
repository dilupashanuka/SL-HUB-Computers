"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SortDropdown({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string | null, _eventDetails: any) => {
    if (!value) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] hidden sm:block">Sort By</span>
      <Select value={currentSort || 'latest'} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[200px] h-12 bg-slate-900 border-white/5 text-[10px] font-black uppercase tracking-widest text-white hover:border-primary/50 rounded-xl focus:ring-0 focus:ring-offset-0 transition-all shadow-xl">
          <SelectValue placeholder="Newest First" />
        </SelectTrigger>
        <SelectContent className="bg-slate-950 border-white/10 text-white rounded-2xl p-1">
          <SelectItem value="latest" className="rounded-lg focus:bg-primary focus:text-white uppercase text-[9px] font-black tracking-widest cursor-pointer py-3">Newest First</SelectItem>
          <SelectItem value="oldest" className="rounded-lg focus:bg-primary focus:text-white uppercase text-[9px] font-black tracking-widest cursor-pointer py-3">Oldest First</SelectItem>
          <SelectItem value="price-low" className="rounded-lg focus:bg-primary focus:text-white uppercase text-[9px] font-black tracking-widest cursor-pointer py-3">Price: Low to High</SelectItem>
          <SelectItem value="price-high" className="rounded-lg focus:bg-primary focus:text-white uppercase text-[9px] font-black tracking-widest cursor-pointer py-3">Price: High to Low</SelectItem>
          <SelectItem value="name-az" className="rounded-lg focus:bg-primary focus:text-white uppercase text-[9px] font-black tracking-widest cursor-pointer py-3">Name: A to Z</SelectItem>
          <SelectItem value="name-za" className="rounded-lg focus:bg-primary focus:text-white uppercase text-[9px] font-black tracking-widest cursor-pointer py-3">Name: Z to A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

