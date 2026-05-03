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
    <Select value={currentSort || ''} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[200px] h-14 bg-white/5 border-white/10 text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white rounded-2xl focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl">
        <SelectItem value="latest" className="focus:bg-primary focus:text-white uppercase text-[10px] font-black tracking-widest cursor-pointer">Newest First</SelectItem>
        <SelectItem value="price-low" className="focus:bg-primary focus:text-white uppercase text-[10px] font-black tracking-widest cursor-pointer">Price: Low-High</SelectItem>
        <SelectItem value="price-high" className="focus:bg-primary focus:text-white uppercase text-[10px] font-black tracking-widest cursor-pointer">Price: High-Low</SelectItem>
      </SelectContent>
    </Select>
  );
}
