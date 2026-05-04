import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Package, Monitor, Smartphone, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { deleteProduct } from '@/app/tarusha/dashboard/products/actions';
import { AdminSearch } from '@/components/admin/AdminSearch';

const PAGE_SIZE = 10;

interface InventorySectionProps {
  type: 'workstations' | 'flagships' | 'components';
  title: string;
  description: string;
  searchParams?: { search?: string; page?: string };
}

export async function InventorySection({ type, title, description, searchParams }: InventorySectionProps) {
  const supabase = await createClient();
  
  const search = searchParams?.search || '';
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const offset = (page - 1) * PAGE_SIZE;

  let query = supabase
    .from('products')
    .select('*, categories(name)', { count: 'exact' })
    .eq('inventory_type', type)
    .order('created_at', { ascending: false });

  if (search) {
    query = query.or(`title.ilike.%${search}%,brand.ilike.%${search}%`);
  }

  query = query.range(offset, offset + PAGE_SIZE - 1);

  const { data: products, count: totalCount } = await query;
  const totalPages = Math.ceil((totalCount || 0) / PAGE_SIZE);

  const Icon = type === 'workstations' ? Monitor : type === 'flagships' ? Smartphone : Cpu;
  const accentColor = type === 'workstations' ? 'text-blue-400' : type === 'flagships' ? 'text-purple-400' : 'text-emerald-400';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("p-2 rounded-xl bg-white/5 border border-white/10", accentColor)}>
              <Icon className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">{title}</h1>
          </div>
          <p className="text-slate-400">{description} ({totalCount || 0} items)</p>
        </div>
        <div className="flex gap-4 items-center">
          <AdminSearch />
          <Link 
            href={`/tarusha/dashboard/products/new?inventory=${type}`}
            className={cn(buttonVariants(), "bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl h-12 px-6 shadow-lg shadow-blue-600/20")}
          >
            <Plus className="w-4 h-4 mr-2" /> Add {title.slice(0, -1)}
          </Link>
        </div>
      </div>

      <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden">
        <CardHeader className="border-b border-white/5 bg-white/5 flex flex-row items-center justify-between py-4">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            Active Stock List
          </CardTitle>
          <div className="text-xs text-slate-400">
            Showing {products?.length ? offset + 1 : 0} - {Math.min(offset + PAGE_SIZE, totalCount || 0)} of {totalCount}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px] py-6 px-6">Product Details</TableHead>
                <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Category</TableHead>
                <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Pricing</TableHead>
                <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Status</TableHead>
                <TableHead className="text-right text-slate-400 font-bold uppercase tracking-wider text-[11px] px-6">Control</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="py-5 px-6">
                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{product.title}</div>
                    {product.brand && (
                      <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">{product.brand} {product.model}</div>
                    )}
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
                      <p>No {title.toLowerCase()} in local inventory terminal.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="border-t border-white/5 p-4 flex items-center justify-between bg-white/[0.02]">
            <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Link
                href={`?${new URLSearchParams({ ...(searchParams as Record<string, string>), page: String(Math.max(1, page - 1)) }).toString()}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "bg-white/5 border-white/10 text-white hover:bg-white/10",
                  page === 1 && "opacity-50 pointer-events-none"
                )}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Link>
              <Link
                href={`?${new URLSearchParams({ ...(searchParams as Record<string, string>), page: String(Math.min(totalPages, page + 1)) }).toString()}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "bg-white/5 border-white/10 text-white hover:bg-white/10",
                  page === totalPages && "opacity-50 pointer-events-none"
                )}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
