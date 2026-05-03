import { createClient } from '@/utils/supabase/server';
import { Button, buttonVariants } from '@/components/ui/button';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/shop/ProductCard';

export const revalidate = 0;

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await props.searchParams;
  const category = resolvedSearchParams.category;
  
  const supabase = await createClient();
  
  let query = supabase.from('products').select('*').order('created_at', { ascending: false });
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data: products } = await query;

  const categories = [
    { label: 'All Items', value: '' },
    { label: 'Desktops', value: 'desktops' },
    { label: 'Monitors', value: 'monitors' },
    { label: 'Smartphones', value: 'phones' },
    { label: 'Accessories', value: 'accessories' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-32">
      {/* Header Area */}
      <div className="pt-32 pb-20 relative overflow-hidden">
        <div className="glow-mesh absolute inset-0 opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">Premium Inventory</span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              Discover <span className="text-gradient">Professional</span> Tech Gear
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
              From high-performance workstations to the latest mobile flagships. 
              Quality guaranteed with islandwide safe delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Grid */}
      <div className="container mx-auto px-4">
        {/* Modern Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
            {categories.map((cat) => (
              <Link 
                key={cat.label}
                href={cat.value ? `/products?category=${cat.value}` : '/products'}
                className={cn(
                  "px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  (!category && !cat.value) || category === cat.value
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                )}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-white/5 border border-white/5 rounded-full pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-primary/50 w-64 transition-all"
              />
            </div>
          </div>
        </div>
        
        {!products || products.length === 0 ? (
          <div className="text-center py-32 glass rounded-[3rem] border border-dashed border-white/10">
            <ShoppingCart className="w-16 h-16 text-slate-800 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-white mb-2">No items found</h3>
            <p className="text-slate-400 font-medium">We are currently updating this category. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
