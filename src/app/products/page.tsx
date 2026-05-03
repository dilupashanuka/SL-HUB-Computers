import { createClient } from '@/utils/supabase/server';
import { ShoppingCart, Search, Grid, List, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/shop/ProductCard';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { MobileFilter } from '@/components/shop/MobileFilter';
import { SortDropdown } from '@/components/shop/SortDropdown';

export const revalidate = 0;

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const resolvedSearchParams = await props.searchParams;
  const category = resolvedSearchParams.category;
  const sort = resolvedSearchParams.sort || 'latest';
  
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  
  let query = supabase.from('products').select('*');
  
  if (category) {
    const selectedCategory = categories?.find(c => c.slug === category);
    if (selectedCategory) {
      const children = categories?.filter(c => c.parent_id === selectedCategory.id) || [];
      const slugs = [category, ...children.map(c => c.slug)];
      query = query.in('category', slugs);
    } else {
      query = query.eq('category', category);
    }
  }

  // Handle sorting
  if (sort === 'price-low') query = query.order('price', { ascending: true });
  else if (sort === 'price-high') query = query.order('price', { ascending: false });
  else query = query.order('created_at', { ascending: false });
  
  const { data: products } = await query;

  // Map products to ensure they have the right field names if needed
  const mappedProducts = products?.map(p => ({
    ...p,
    title: p.name || p.title, // Handle both name and title if there's a discrepancy
  })) || [];

  return (
    <div className="min-h-screen bg-slate-950 pb-32">
      {/* Immersive Header */}
      <div className="pt-40 pb-24 relative overflow-hidden">
        <div className="glow-mesh absolute inset-0 opacity-50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-2 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">SL HUB Tech Shop</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              Explore Our <span className="text-gradient">Premium</span> Inventory
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Find the perfect machine for your needs. We stock only the most reliable brands with guaranteed islandwide warranty.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
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

          <div className="flex flex-wrap items-center gap-4">
             <MobileFilter currentCategory={category} categories={categories || []} />
             <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-2xl p-1 border border-white/5">
              <button className="p-3 rounded-xl bg-primary text-primary-foreground shadow-lg"><Grid className="w-4 h-4" /></button>
              <button className="p-3 rounded-xl text-slate-500 hover:text-white transition-all"><List className="w-4 h-4" /></button>
            </div>
            
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
            {!mappedProducts || mappedProducts.length === 0 ? (
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
                {mappedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

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
