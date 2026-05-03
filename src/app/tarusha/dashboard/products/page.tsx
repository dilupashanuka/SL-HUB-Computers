import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import Link from 'next/link';
import { deleteProduct } from './actions';

export default async function AdminProductsPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await props.searchParams;
  const categoryFilter = resolvedSearchParams.category;

  const supabase = await createClient();
  let query = supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  if (categoryFilter) {
    query = query.eq('category', categoryFilter);
  }

  const { data: products } = await query;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Inventory Management</h1>
          <p className="text-slate-400">Total of {products?.length || 0} products in your store.</p>
        </div>
        <Link 
          href="/tarusha/dashboard/products/new"
          className={cn(buttonVariants(), "bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl h-12 px-6 shadow-lg shadow-blue-600/20")}
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Product
        </Link>
      </div>

      <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden">
        <CardHeader className="border-b border-white/5 bg-white/5">
          <CardTitle className="text-white">
            {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Items` : 'All Store Items'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px] py-6 px-6">Product Details</TableHead>
                <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Category</TableHead>
                <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Pricing</TableHead>
                <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Inventory Status</TableHead>
                <TableHead className="text-right text-slate-400 font-bold uppercase tracking-wider text-[11px] px-6">Control</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="py-5 px-6">
                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{product.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-tighter">ID: {product.id.slice(0, 8)}...</div>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-lg bg-slate-800 border border-white/10 text-slate-300 text-[11px] font-bold uppercase tracking-wider">
                      {product.categories?.name || product.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-white">
                      {product.price ? `Rs. ${Number(product.price).toLocaleString()}` : '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      product.in_stock 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.in_stock ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      {product.in_stock ? 'Active' : 'Stock Out'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/tarusha/dashboard/products/${product.id}`}
                        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "w-9 h-9 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30")}
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          type="submit" 
                          className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-red-400 hover:bg-red-400/20 hover:border-red-500/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!products?.length && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-slate-500 font-medium">
                    <div className="flex flex-col items-center gap-4">
                      <Package className="w-12 h-12 opacity-20" />
                      <p>No products detected in local inventory terminal.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

