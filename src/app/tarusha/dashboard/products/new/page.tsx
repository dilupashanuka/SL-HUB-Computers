import { createClient } from '@/utils/supabase/server';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProductForm } from '@/components/admin/ProductForm';

export default async function NewProductPage(props: {
  searchParams: Promise<{ inventory?: string }>;
}) {
  const { inventory } = await props.searchParams;
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link 
          href="/tarusha/dashboard/products"
          className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Add New Product</h1>
          <p className="text-slate-400">Expand your store inventory with high-end tech.</p>
        </div>
      </div>

      <ProductForm 
        categories={categories || []} 
        fixedInventoryType={inventory}
      />
    </div>
  );
}
