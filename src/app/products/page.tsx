import { createClient } from '@/utils/supabase/server';
import { ShoppingCart, Search, Grid, List, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/shop/ProductCard';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { MobileFilter } from '@/components/shop/MobileFilter';
import { SortDropdown } from '@/components/shop/SortDropdown';

import { InventoryHeader } from '@/components/shop/InventoryHeader';
import { ProductGridClient } from '@/components/shop/ProductGridClient';
import { CategoryNavigator } from '@/components/shop/CategoryNavigator';

export const revalidate = 0;

export default async function ProductsPage(props: {
  searchParams: Promise<{ 
    category?: string; 
    sort?: string; 
    inventory?: string;
    min?: string;
    max?: string;
    [key: string]: string | undefined;
  }>;
}) {
  const resolvedSearchParams = await props.searchParams;
  const category = resolvedSearchParams.category;
  const sort = resolvedSearchParams.sort || 'latest';
  const inventory = resolvedSearchParams.inventory;
  const min = resolvedSearchParams.min ? Number(resolvedSearchParams.min) : undefined;
  const max = resolvedSearchParams.max ? Number(resolvedSearchParams.max) : undefined;
  
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  const { data: slides } = await supabase.from('inventory_slides').select('*').order('created_at', { ascending: false });
  const { data: headerSettings } = await supabase.from('site_settings').select('*').eq('id', 'inventory_header_text').single();
  
  // 1. Fetch products for the current inventory to extract specifications
  let specQuery = supabase.from('products').select('specifications, brand');
  if (inventory) specQuery = specQuery.eq('inventory_type', inventory);
  const { data: allProductsForSpecs } = await specQuery;

  const availableSpecs: Record<string, Set<string>> = {};
  const availableBrands = new Set<string>();

  allProductsForSpecs?.forEach(p => {
    if (p.brand) {
      availableBrands.add(p.brand);
    }
    if (p.specifications) {
      Object.entries(p.specifications as Record<string, string>).forEach(([key, value]) => {
        if (!availableSpecs[key]) availableSpecs[key] = new Set();
        availableSpecs[key].add(value);
      });
    }
  });

  const formattedAvailableSpecs = Object.entries(availableSpecs).reduce((acc, [key, values]) => {
    acc[key] = Array.from(values).sort();
    return acc;
  }, {} as Record<string, string[]>);

  const formattedAvailableBrands = Array.from(availableBrands).sort();

  // 2. Build the main query
  let query = supabase.from('products').select('*');
  
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

  // Handle Brand Filter
  if (resolvedSearchParams.brand) {
    query = query.eq('brand', resolvedSearchParams.brand);
  }

  // Handle Dynamic Spec Filters
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (key.startsWith('spec_')) {
      const specKey = key.replace('spec_', '');
      query = query.contains('specifications', { [specKey]: value });
    }
  });

  if (min !== undefined) {
    query = query.gte('price', min);
  }
  if (max !== undefined) {
    query = query.lte('price', max);
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
    image_url: p.image || p.image_url,
    price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
    description: p.description || (p.specifications ? Object.entries(p.specifications).map(([k, v]) => `${k}: ${v}`).join(', ') : ''),
    category: categories?.find(c => c.id === p.category_id)?.name || p.category || 'Uncategorized'
  })) || [];

  return (
    <div className="min-h-screen bg-slate-950 pb-32">
      <InventoryHeader slides={slides || []} settings={headerSettings} />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Category Navigator for Inventory Entry */}
        {inventory && !category && (
          <CategoryNavigator categories={categories || []} currentInventory={inventory} />
        )}

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
             <MobileFilter 
               currentCategory={category} 
               categories={categories || []} 
               availableSpecs={formattedAvailableSpecs}
               availableBrands={formattedAvailableBrands}
             />
             <SortDropdown currentSort={sort} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <ShopSidebar 
              currentCategory={category} 
              categories={categories || []} 
              availableSpecs={formattedAvailableSpecs}
              availableBrands={formattedAvailableBrands}
            />
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
