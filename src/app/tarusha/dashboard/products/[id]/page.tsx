import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Package, ArrowLeft, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { updateProduct, deleteProduct } from '../actions';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: { id: string } }) {
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

      <form action={updateProduct}>
        <input type="hidden" name="id" value={product.id} />
        <input type="hidden" name="existing_images" value={JSON.stringify(product.images || [])} />
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl">General Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Product Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    defaultValue={product.title}
                    required 
                    className="bg-white/5 border-white/10 text-white h-12 focus:border-blue-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Product Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    defaultValue={product.description}
                    rows={6}
                    className="bg-white/5 border-white/10 text-white focus:border-blue-500/50 resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Category</Label>
                    <select 
                      id="category" 
                      name="category" 
                      defaultValue={product.category}
                      className="w-full bg-white/5 border border-white/10 text-white h-12 rounded-lg px-4 focus:outline-none focus:border-blue-500/50 appearance-none"
                      required
                    >
                      {categories?.map(cat => (
                        <option key={cat.id} value={cat.slug} className="bg-slate-900">{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Price (LKR)</Label>
                    <Input 
                      id="price" 
                      name="price" 
                      type="number" 
                      defaultValue={product.price}
                      required 
                      className="bg-white/5 border-white/10 text-white h-12 focus:border-blue-500/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl">Media Assets</CardTitle>
                <CardDescription className="text-slate-500">Current images and bulk upload new ones.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {product.images?.map((url: string, i: number) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/5 relative group">
                      <Image src={url} alt={`Product ${i}`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] font-black text-white uppercase">Active Image</span>
                      </div>
                    </div>
                  ))}
                  <div className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-pointer bg-white/5 relative">
                    <input 
                      type="file" 
                      name="images" 
                      multiple 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*"
                    />
                    <Upload className="w-6 h-6 mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-center">Add More</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-8">
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl">Update Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <Label className="text-white font-bold">Inventory Status</Label>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">In Stock / Out of Stock</p>
                  </div>
                  <Switch name="in_stock" defaultChecked={product.in_stock} />
                </div>

                <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 uppercase">
                  Save Changes
                </Button>
                
                <Link href="/tarusha/dashboard/products" className="block text-center text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
                  Cancel
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-red-500/5 border-red-500/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-red-400 text-lg">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={product.id} />
                  <Button type="submit" variant="destructive" className="w-full h-12 font-bold uppercase tracking-widest">
                    Delete Product
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
