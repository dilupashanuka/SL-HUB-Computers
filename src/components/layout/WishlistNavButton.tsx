"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

const WISHLIST_KEY = 'sl-hub-wishlist';

export function WishlistNavButton() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const syncCount = () => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      setCount(ids.length);
    } catch {
      setCount(0);
    }
  };

  useEffect(() => {
    setMounted(true);
    syncCount();
    window.addEventListener('wishlist-change', syncCount);
    return () => window.removeEventListener('wishlist-change', syncCount);
  }, []);

  if (!mounted) return null;

  return (
    <Link
      href="/wishlist"
      className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-white/5 transition-all"
      title="Saved Items"
    >
      <Heart className={`w-5 h-5 transition-all ${count > 0 ? 'fill-red-500 text-red-500' : ''}`} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center px-1 shadow-[0_0_8px_rgba(239,68,68,0.6)]">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  );
}
