"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: { name: string };
}

interface TrendingAccessoriesProps {
  products: Product[];
}

export function TrendingAccessories({ products }: TrendingAccessoriesProps) {
  if (!products?.length) return null;

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Trending <span className="text-gradient">Accessories</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              The perfect companions for your setup
            </p>
          </div>
          <Link href="/products?inventory=components" className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href={`/products/${product.id}`} className="group block glass-card p-4 rounded-[2rem] hover:border-primary/30 transition-all h-full">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-900/50">
                  <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    fill 
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-xl">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{product.category.name}</p>
                  <h3 className="text-xs font-bold text-white truncate group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm font-black text-white mt-2">
                    Rs. {product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <Link href="/products?inventory=components" className="flex sm:hidden items-center justify-center gap-2 text-slate-400 mt-8 text-[10px] font-black uppercase tracking-widest">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
