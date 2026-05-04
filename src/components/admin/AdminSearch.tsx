"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function AdminSearch() {
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
    params.delete('page'); // Reset page on new search
    
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [router, searchParams]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isPending ? 'text-blue-400 animate-pulse' : 'text-slate-400'}`} />
      <Input
        type="text"
        placeholder="Search products by name or brand..."
        defaultValue={searchParams.get('search') ?? ''}
        onChange={(e) => {
          const timer = setTimeout(() => handleSearch(e.target.value), 400);
          return () => clearTimeout(timer);
        }}
        className="bg-white/5 border-white/10 text-white pl-10 h-10 w-full"
      />
    </div>
  );
}
