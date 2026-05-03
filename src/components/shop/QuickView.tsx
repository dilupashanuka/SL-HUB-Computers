"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { MessageCircle, ShoppingCart, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  in_stock: boolean;
}

export function QuickView({ product, children }: { product: Product, children: React.ReactElement }) {
  const whatsappUrl = `https://wa.me/94710678944?text=I'm interested in ${product.title}`;

  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-slate-950 border-white/5 rounded-[3rem]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-square relative bg-slate-900 flex items-center justify-center p-10">
            <Image src={product.image_url} alt={product.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-8" />
          </div>
          <div className="p-10 space-y-8">
            <div className="space-y-2">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">{product.category}</span>
              <DialogTitle className="text-4xl font-black text-white tracking-tighter uppercase">{product.title}</DialogTitle>
              <div className="text-3xl font-black text-white">Rs. {product.price.toLocaleString()}</div>
            </div>
            
            <p className="text-slate-400 font-medium leading-relaxed line-clamp-4">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Warranty</span>
                <span className="text-xs font-bold text-white uppercase">3 Years Genuine</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shipping</span>
                <span className="text-xs font-bold text-white uppercase">Islandwide</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                className="flex-1 h-16 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </a>
              <a 
                href={`/products?id=${product.id}`}
                className="h-16 px-6 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center hover:bg-white/5 transition-all"
              >
                View Full Info
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
