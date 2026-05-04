"use client"

import { useEffect, useState, useCallback } from 'react';
import { Heart } from 'lucide-react';

const WISHLIST_KEY = 'sl-hub-wishlist';

function getWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  } catch {
    return [];
  }
}

export function WishlistButton({ productId, size = 'sm' }: { productId: string; size?: 'sm' | 'lg' }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsWishlisted(getWishlist().includes(productId));
  }, [productId]);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const current = getWishlist();
    const next = current.includes(productId)
      ? current.filter(id => id !== productId)
      : [...current, productId];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    setIsWishlisted(next.includes(productId));
    // Dispatch a storage event so other components can react
    window.dispatchEvent(new Event('wishlist-change'));
  }, [productId]);

  if (!mounted) {
    return (
      <button
        aria-label="Add to wishlist"
        className={size === 'lg' 
          ? "h-14 w-14 flex items-center justify-center glass rounded-xl border border-white/10 text-slate-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
          : "absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
        }
      >
        <Heart className={size === 'lg' ? "w-6 h-6" : "w-4 h-4"} />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
      className={size === 'lg' 
        ? `h-14 w-14 flex items-center justify-center glass rounded-xl border transition-all ${
            isWishlisted 
              ? 'border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/20' 
              : 'border-white/10 text-slate-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30'
          }`
        : `absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center backdrop-blur-sm rounded-full transition-all ${
            isWishlisted 
              ? 'bg-red-500/20 text-red-500 opacity-100' 
              : 'bg-black/40 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100'
          }`
      }
    >
      <Heart className={`${size === 'lg' ? "w-6 h-6" : "w-4 h-4"} ${isWishlisted ? "fill-red-500" : ""} transition-all`} />
    </button>
  );
}
