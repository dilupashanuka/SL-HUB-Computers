"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, LayoutGrid } from 'lucide-react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  description?: string;
  inventory_type: string;
}

interface CategoryNavigatorProps {
  categories: Category[];
  currentInventory?: string;
}

export function CategoryNavigator({ categories, currentInventory }: CategoryNavigatorProps) {
  const filteredCategories = currentInventory 
    ? categories.filter(c => c.inventory_type === currentInventory && !c.parent_id)
    : [];

  if (filteredCategories.length === 0) return null;

  return (
    <div className="space-y-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-3">
            <LayoutGrid className="w-6 h-6 text-blue-500" />
            Shop by Category
          </h2>
          <p className="text-slate-400 text-sm font-medium">Select a segment to refine your search.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              href={`/products?category=${category.slug}${currentInventory ? `&inventory=${currentInventory}` : ''}`}
              className="group block relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 border border-white/5 hover:border-blue-500/50 transition-all duration-500"
            >
              {category.image_url ? (
                <Image 
                  src={category.image_url} 
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                   <LayoutGrid className="w-12 h-12 text-white/10" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-xs text-slate-400 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                )}
                <div className="pt-2 flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Explore Now <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
