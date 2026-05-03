import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createProduct } from '../actions';
import { AdminMediaUpload } from '@/components/admin/AdminMediaUpload';

export default async function NewProductPage() {
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

      <form action={createProduct}>
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
                    required 
                    placeholder="e.g., Apple MacBook Pro M3" 
                    className="bg-white/5 border-white/10 text-white h-12 focus:border-blue-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Product Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    rows={6}
                    placeholder="Provide a detailed technical description..." 
                    className="bg-white/5 border-white/10 text-white focus:border-blue-500/50 resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category_id" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Category</Label>
                    <select 
                      id="category_id" 
                      name="category_id" 
                      className="w-full bg-white/5 border border-white/10 text-white h-12 rounded-lg px-4 focus:outline-none focus:border-blue-500/50 appearance-none"
                      required
                    >
                      <option value="" disabled selected className="bg-slate-900">Select Category</option>
                      {categories?.filter(c => !c.parent_id).map(parent => (
                        <>
                          <option key={parent.id} value={parent.id} className="bg-slate-900 font-bold">{parent.name}</option>
                          {categories?.filter(c => c.parent_id === parent.id).map(child => (
                            <option key={child.id} value={child.id} className="bg-slate-900 pl-4 text-slate-400">
                              &nbsp;&nbsp;&nbsp;↳ {child.name}
                            </option>
                          ))}
                        </>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Price (LKR)</Label>
                    <Input 
                      id="price" 
                      name="price" 
                      type="number" 
                      required 
                      placeholder="0.00" 
                      className="bg-white/5 border-white/10 text-white h-12 focus:border-blue-500/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl">Media Assets</CardTitle>
                <CardDescription className="text-slate-500">Upload multiple images for your product showcase.</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminMediaUpload name="images" multiple required />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-8">
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-xl">Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <Label className="text-white font-bold">Inventory Status</Label>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">In Stock / Out of Stock</p>
                  </div>
                  <Switch name="in_stock" defaultChecked />
                </div>

                <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 uppercase">
                  Deploy to Store
                </Button>
                
                <Link href="/tarusha/dashboard/products" className="block text-center text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
                  Cancel and Return
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-blue-600/10 border-blue-500/20 backdrop-blur-md">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 h-fit">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Stock Management</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      All products uploaded will be immediately visible to customers on the main inventory terminal. Ensure data accuracy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
