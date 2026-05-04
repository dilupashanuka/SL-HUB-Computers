import { createClient } from '@/utils/supabase/server';
import { ShoppingCart, Search, Grid, List, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/shop/ProductCard';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { MobileFilter } from '@/components/shop/MobileFilter';
import { SortDropdown } from '@/components/shop/SortDropdown';

import { InventoryHeader } from '@/components/shop/InventoryHeader';
import { ProductGridClient } from '@/components/shop/ProductGridClient';

export const revalidate = 0;

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string; sort?: string; inventory?: string }>;
}) {
  const resolvedSearchParams = await props.searchParams;
  const category = resolvedSearchParams.category;
  const sort = resolvedSearchParams.sort || 'latest';
  const inventory = resolvedSearchParams.inventory;
  
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  const { data: slides } = await supabase.from('inventory_slides').select('*').order('created_at', { ascending: false });
  const { data: headerSettings } = await supabase.from('site_settings').select('*').eq('id', 'inventory_header_text').single();
  
  let query = supabase.from('products').select('*');
  
  // ... rest of query logic ...
  if (inventory) {
    query = query.eq('inventory_type', inventory);
  }
  
  if (category) {
    const selectedCategory = categories?.find(c => c.slug === category);
    if (selectedCategory) {
      const children = categories?.filter(c => c.parent_id === selectedCategory.id) || [];
      const ids = [selectedCategory.id, ...children.map(c => c.id)];
      query = query.in('category_id', ids);
    } else {
      query = query.eq('category', category);
    }
  }

  if (sort === 'price-low') query = query.order('price', { ascending: true });
  else if (sort === 'price-high') query = query.order('price', { ascending: false });
  else if (sort === 'oldest') query = query.order('created_at', { ascending: true });
  else if (sort === 'name-az') query = query.order('name', { ascending: true });
  else if (sort === 'name-za') query = query.order('name', { ascending: false });
  else query = query.order('created_at', { ascending: false });
  
  const { data: products } = await query;

  const mappedProducts = products?.map(p => ({
    ...p,
    title: p.name || p.title,
  })) || [];

  return (
    <div className="min-h-screen bg-slate-950 pb-32">
      <InventoryHeader slides={slides || []} settings={headerSettings} />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Modern Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 p-6 glass rounded-[2.5rem] border-white/5">
          <div className="flex items-center gap-4">
            <div className="relative group flex-1 sm:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search by model, brand, or specs..." 
                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
             <MobileFilter currentCategory={category} categories={categories || []} />
             <SortDropdown currentSort={sort} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <ShopSidebar currentCategory={category} categories={categories || []} />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGridClient products={mappedProducts} />

            {/* Pagination Placeholder */}
            {products && products.length > 0 && (
              <div className="mt-20 flex justify-center">
                <button className="px-12 py-5 glass rounded-full text-xs font-black uppercase tracking-[0.3em] text-white hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
