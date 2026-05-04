"use client"

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  in_stock: boolean;
  specifications?: Record<string, string>;
  brand?: string;
}

export function QuickView({ product, children }: { product: Product, children: React.ReactElement }) {
  const whatsappUrl = `https://wa.me/94710678944?text=I'm interested in buying ${product.title}`;

  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-[#0f1219] border-white/5 rounded-3xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image */}
          <div className="relative bg-[#0a0d14] flex items-center justify-center p-12 min-h-[400px] md:h-auto">
            {product.image_url ? (
              <Image 
                src={product.image_url} 
                alt={product.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw" 
                className="object-contain p-12" 
              />
            ) : (
              <ShoppingCart className="w-24 h-24 text-slate-800" />
            )}
          </div>
          
          {/* Right Column: Details */}
          <div className="p-8 md:p-12 space-y-8 flex flex-col">
            <div className="space-y-4">
              <DialogTitle className="text-2xl font-bold text-white uppercase leading-snug">
                {product.title}
              </DialogTitle>
              
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 px-3 py-1 font-medium">{product.category}</Badge>
                {product.in_stock ? (
                  <Badge className="bg-[#111111] text-white border-white/10 px-3 py-1 font-medium">In Stock</Badge>
                ) : (
                  <Badge className="bg-red-500/10 text-red-500 border-red-500/20 px-3 py-1 font-medium">Out of Stock</Badge>
                )}
                {product.brand && (
                  <Badge className="bg-[#111111] text-white border-white/10 uppercase px-3 py-1 font-black">{product.brand}</Badge>
                )}
              </div>
              
              <div className="text-3xl font-medium text-white pt-2">
                {product.price ? `Rs. ${product.price.toLocaleString()}.00` : 'Contact Us'}
              </div>
            </div>

            <div className="flex gap-4 pb-6 border-b border-white/5">
              <a 
                href={whatsappUrl}
                target="_blank"
                className="flex-1 h-12 bg-[#00c8c8] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#00c8c8]/90 transition-all shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Add To Cart
              </a>
              <a 
                href={whatsappUrl}
                target="_blank"
                className="h-12 px-8 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
              >
                Buy Now
              </a>
            </div>

            {/* Specifications Table */}
            <div className="space-y-4 flex-1">
              <h4 className="font-bold text-white text-lg">Specifications</h4>
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <div className="flex flex-col border-y border-white/5 py-2 text-sm">
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <div 
                      key={key} 
                      className={cn(
                        "grid grid-cols-3 p-3 gap-4 border-b border-white/5 last:border-0",
                        idx % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                      )}
                    >
                      <div className="col-span-1 text-slate-400 font-bold uppercase text-[10px] tracking-wider flex items-center">{key}</div>
                      <div className="col-span-2 text-slate-200">{value}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm leading-relaxed">{product.description}</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
