import { createClient } from '@/utils/supabase/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/admin/ProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  
  // Resolve params
  const { id } = await params;

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) notFound();

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
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Edit Product</h1>
          <p className="text-slate-400">Modify technical details for {product.title}.</p>
        </div>
      </div>

      <ProductForm 
        initialData={product}
        categories={categories || []} 
      />
    </div>
  );
}
