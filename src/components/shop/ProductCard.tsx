"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { ShoppingCart, Eye, Heart, Share2, MessageCircle, ArrowRight } from 'lucide-react';
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
}

export function ProductCard({ product }: { product: Product }) {
  const whatsappUrl = `https://wa.me/94710678944?text=I'm interested in buying ${product.title}`;

  return (
    <Card className="group overflow-hidden flex flex-col bg-slate-950/50 backdrop-blur-md border border-white/5 hover:border-primary/50 transition-all duration-500 rounded-3xl h-full">
      {/* Image Area */}
      <div className="aspect-square relative overflow-hidden bg-slate-900">
        {product.image_url ? (
          <Image 
            src={product.image_url} 
            alt={product.title} 
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-800">
            <ShoppingCart className="w-16 h-16" />
          </div>
        )}

        {/* SellX Style Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link 
            href={whatsappUrl}
            target="_blank"
            className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          >
            <MessageCircle className="w-6 h-6" />
          </Link>
          <QuickView product={product}>
            <button className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-transform">
              <Eye className="w-6 h-6" />
            </button>
          </QuickView>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-4 left-4 z-10">
          {product.in_stock ? (
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              Available
            </Badge>
          ) : (
            <Badge className="bg-red-500/10 text-red-500 border-red-500/20 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              Sold Out
            </Badge>
          )}
        </div>
      </div>

      {/* Content Area */}
      <CardHeader className="p-6 space-y-2 flex-1">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
            {product.category}
          </span>
          <CardTitle className="text-xl font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </CardTitle>
        </div>
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </CardHeader>

      {/* Footer Area */}
      <CardFooter className="p-6 pt-0 mt-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pricing</span>
            <span className="text-2xl font-black text-white">
              {product.price ? `Rs. ${product.price.toLocaleString()}` : 'Contact Us'}
            </span>
          </div>
          
          <Link 
            href={whatsappUrl} 
            target="_blank"
            className="flex items-center gap-2 text-xs font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-widest"
          >
            Buy Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
