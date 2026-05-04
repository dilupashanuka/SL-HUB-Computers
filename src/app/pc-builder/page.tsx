import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { PCBuilderClient } from '@/components/shop/PCBuilderClient';
import { Cpu } from 'lucide-react';

export const revalidate = 0;

export default async function PCBuilderPage() {
  const supabaseAdmin = createAdminClient();

  // Safe fetch — tables may not exist yet
  let preBuilds: any[] = [];
  let products: any[] = [];
  let categoryMapping: Record<string, string | null> = {};

  try {
    const { data } = await supabaseAdmin
      .from('pc_builds')
      .select('*, pc_build_components(*, products(id, title, price, image_url, brand))')
      .eq('is_active', true)
      .order('is_featured', { ascending: false });
    preBuilds = data || [];
  } catch (e) { preBuilds = []; }

  try {
    const { data } = await supabaseAdmin
      .from('products')
      .select('id, title, price, image_url, brand, category, description, specifications')
      .eq('in_stock', true)
      .order('title');
    products = data || [];
  } catch (e) { products = []; }

  try {
    const { data: mappings } = await supabaseAdmin
      .from('pc_component_type_categories')
      .select('component_type, category_id');
    for (const m of mappings || []) {
      categoryMapping[m.component_type] = m.category_id;
    }
  } catch (e) { categoryMapping = {}; }

  return (
    <main className="min-h-screen bg-[#080c14] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
          <Cpu className="w-3 h-3" /> PC Builder
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
          Build Your<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Dream Machine</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Pick from our pre-configured builds or design your own — we'll quote it on WhatsApp instantly.
        </p>
      </div>
      <PCBuilderClient
        preBuilds={preBuilds}
        products={products}
        categoryMapping={categoryMapping}
      />
    </main>
  );
}
