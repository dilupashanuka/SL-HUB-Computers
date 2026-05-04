"use client"

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ProductCard } from '@/components/shop/ProductCard';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const WISHLIST_KEY = 'sl-hub-wishlist';

export default function WishlistPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const ids: string[] = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
        if (ids.length === 0) {
          setLoading(false);
          return;
        }
        const supabase = createClient();
        const { data } = await supabase
          .from('products')
          .select('*')
          .in('id', ids);
        setProducts(data || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();

    // Listen for wishlist changes (e.g. when heart is toggled)
    const onWishlistChange = () => loadWishlist();
    window.addEventListener('wishlist-change', onWishlistChange);
    return () => window.removeEventListener('wishlist-change', onWishlistChange);
  }, []);

  return (
    <main className="min-h-screen bg-[#080c14] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <Link 
            href="/products"
            className="w-12 h-12 flex items-center justify-center glass rounded-2xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                Saved Items
              </h1>
            </div>
            <p className="text-slate-500 text-sm font-medium">
              {loading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''} saved`}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  category: product.category,
                  price: product.price,
                  image_url: product.image_url,
                  in_stock: product.in_stock,
                  specifications: product.specifications,
                  brand: product.brand,
                }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-8 text-center">
            <div className="w-24 h-24 rounded-full glass border border-white/10 flex items-center justify-center">
              <Heart className="w-10 h-10 text-slate-700" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-3">
                No Saved Items
              </h2>
              <p className="text-slate-500 text-sm max-w-sm">
                Tap the ❤️ on any product to save it here for later.
              </p>
            </div>
            <Link 
              href="/products"
              className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              <ShoppingCart className="w-4 h-4" />
              Browse Inventory
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
