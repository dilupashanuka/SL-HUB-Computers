"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { Search } from 'lucide-react';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    // Reset to page 1 on new search
    params.delete('page');
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }, [router, searchParams]);

  return (
    <div className="relative group flex-1 sm:w-96">
      <Search className={`absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isPending ? 'text-primary animate-pulse' : 'text-slate-500 group-focus-within:text-primary'}`} />
      <input
        type="text"
        placeholder="Search by model, brand, or specs..."
        defaultValue={searchParams.get('search') ?? ''}
        onChange={(e) => {
          const timer = setTimeout(() => handleSearch(e.target.value), 400);
          return () => clearTimeout(timer);
        }}
        className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
      />
    </div>
  );
}
