"use client"

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { QuickView } from './QuickView';

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

export function ProductCard({ product }: { product: Product }) {
  const whatsappUrl = `https://wa.me/94710678944?text=I'm interested in buying ${product.title}`;

  return (
    <Card className="group overflow-hidden flex flex-col bg-[#0f1219] border border-white/5 hover:border-primary/30 transition-all duration-300 rounded-2xl h-full shadow-lg">
      <QuickView product={product}>
        <div className="cursor-pointer relative flex-1 flex flex-col group/item">
          {/* Image Area */}
          <div className="relative aspect-square bg-[#0a0d14] p-8 flex items-center justify-center">
            {product.image_url ? (
              <Image 
                src={product.image_url} 
                alt={product.title} 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-contain p-8 transition-transform duration-700 group-hover/item:scale-105"
              />
            ) : (
              <ShoppingCart className="w-16 h-16 text-slate-800" />
            )}

            {/* Stock Badge - Bottom Right of Image */}
            <div className="absolute bottom-4 right-4 z-10">
              {product.in_stock ? (
                <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 text-[10px] font-bold rounded-full backdrop-blur-md">
                  In Stock
                </Badge>
              ) : (
                <Badge className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 text-[10px] font-bold rounded-full backdrop-blur-md">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          {/* Title Area */}
          <div className="p-5 pb-2">
            <h3 className="font-bold text-white text-[15px] uppercase leading-snug group-hover/item:text-primary transition-colors">
              {product.title}
            </h3>
          </div>
        </div>
      </QuickView>

      {/* Price & Cart Area */}
      <div className="p-5 pt-2 mt-auto flex items-end justify-between">
        <div className="text-xl font-medium text-white">
          {product.price ? `Rs. ${product.price.toLocaleString()}.00` : 'Contact Us'}
        </div>
        
        {/* Direct WhatsApp Cart Icon */}
        <Link 
          href={whatsappUrl} 
          target="_blank"
          className="w-10 h-10 rounded-xl bg-transparent border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm"
        >
          <ShoppingCart className="w-5 h-5" />
        </Link>
      </div>
    </Card>
  );
}
