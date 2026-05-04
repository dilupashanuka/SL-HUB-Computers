'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { ShoppingCart } from 'lucide-react';

export function ProductGridClient({ products }: { products: any[] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={products.length > 0 ? products[0].id : 'empty'} // Force re-animation on product change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {!products || products.length === 0 ? (
          <div className="text-center py-40 glass rounded-[3.5rem] border border-dashed border-white/10">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-10 h-10 text-slate-700" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4 italic">No items found in this section</h3>
            <p className="text-slate-400 font-medium text-lg max-w-sm mx-auto">
              Try adjusting your filters or check back later as we update our stock daily.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
