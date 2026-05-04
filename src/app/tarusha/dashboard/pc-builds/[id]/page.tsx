import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, ArrowLeft, Cpu, Star, Package } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { updatePCBuild, upsertBuildComponent, removeBuildComponent } from '../actions';

const COMPONENT_TYPES = ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU', 'Case', 'Cooler', 'Monitor', 'Other'];

export default async function EditPCBuildPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: build } = await supabase
    .from('pc_builds')
    .select('*')
    .eq('id', id)
    .single();

  if (!build) notFound();

  const { data: components } = await supabase
    .from('pc_build_components')
    .select('*, products(title, price, image_url)')
    .eq('build_id', id)
    .order('sort_order');

  // Get all component products for linking
  const { data: allProducts } = await supabase
    .from('products')
    .select('id, title, price, inventory_type')
    .eq('in_stock', true)
    .order('title');

  const usedTypes = components?.map(c => c.component_type) || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/tarusha/dashboard/pc-builds"
          className="w-10 h-10 flex items-center justify-center glass rounded-xl border border-white/10 text-slate-400 hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{build.name}</h1>
          <p className="text-slate-400 text-sm">Edit build details and manage components</p>
        </div>
        <Link href="/pc-builder" target="_blank" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "border-white/10 text-slate-400 hover:text-white")}>
          Preview →
        </Link>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left: Build Info + Components */}
        <div className="lg:col-span-3 space-y-6">

          {/* Components Manager */}
          <Card className="bg-slate-900/40 border-white/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" /> Components
              </CardTitle>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                {components?.length || 0} / {COMPONENT_TYPES.length} parts
              </span>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Existing components */}
              {components?.map((comp) => (
                <div key={comp.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">{comp.component_type}</p>
                    <p className="text-sm font-bold text-white truncate">
                      {comp.products?.title || comp.custom_name || 'Unnamed'}
                    </p>
                    <p className="text-xs text-slate-400">
                      Rs. {(comp.products?.price || comp.custom_price || 0).toLocaleString()} × {comp.quantity}
                    </p>
                  </div>
                  <form action={removeBuildComponent}>
                    <input type="hidden" name="id" value={comp.id} />
                    <input type="hidden" name="build_id" value={id} />
                    <Button variant="ghost" size="icon" type="submit"
                      className="w-8 h-8 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              ))}

              {/* Add Component Form */}
              <div className="border-t border-white/5 pt-4 space-y-3">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Add / Replace Component</p>
                <form action={upsertBuildComponent} className="space-y-3">
                  <input type="hidden" name="build_id" value={id} />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Component Type</Label>
                      <select name="component_type" required
                        className="w-full bg-white/5 border border-white/10 text-white h-10 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500/50">
                        {COMPONENT_TYPES.map(t => (
                          <option key={t} value={t} className="bg-slate-900">
                            {usedTypes.includes(t) ? `✓ ${t}` : t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Qty</Label>
                      <Input name="quantity" type="number" defaultValue={1} min={1} className="bg-white/5 border-white/10 text-white h-10" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Link Product (from inventory)</Label>
                    <select name="product_id"
                      className="w-full bg-white/5 border border-white/10 text-white h-10 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500/50">
                      <option value="" className="bg-slate-900">— None (use custom below) —</option>
                      {allProducts?.map(p => (
                        <option key={p.id} value={p.id} className="bg-slate-900">
                          {p.title} — Rs. {Number(p.price).toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Custom Name (if no product)</Label>
                      <Input name="custom_name" placeholder="e.g., Intel Core i9-14900K" className="bg-white/5 border-white/10 text-white h-10" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Custom Price (LKR)</Label>
                      <Input name="custom_price" type="number" defaultValue={0} className="bg-white/5 border-white/10 text-white h-10" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 rounded-xl h-10">
                    <Plus className="w-4 h-4 mr-2" /> Add Component
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className="bg-gradient-to-br from-blue-600/10 to-transparent border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-1">Auto-calculated Total</p>
                  <p className="text-3xl font-black text-white">
                    Rs. {Number(build.total_price || 0).toLocaleString()}
                  </p>
                </div>
                <Package className="w-10 h-10 text-blue-400/30" />
              </div>
              <p className="text-xs text-slate-500 mt-2">Updates automatically when components are added or removed.</p>
            </CardContent>
          </Card>
        </div>

        {/* Right: Build Settings */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/40 border-white/5 sticky top-32">
            <CardHeader>
              <CardTitle className="text-white">Build Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updatePCBuild} className="space-y-5">
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="existing_image" value={build.image_url || ''} />

                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Build Name</Label>
                  <Input name="name" defaultValue={build.name} required className="bg-white/5 border-white/10 text-white h-11" />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Description</Label>
                  <Textarea name="description" defaultValue={build.description} className="bg-white/5 border-white/10 text-white" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Category</Label>
                  <select name="category" defaultValue={build.category}
                    className="w-full bg-white/5 border border-white/10 text-white h-11 rounded-lg px-4 focus:outline-none focus:border-blue-500/50">
                    <option value="gaming" className="bg-slate-900">🎮 Gaming</option>
                    <option value="office" className="bg-slate-900">💼 Office</option>
                    <option value="budget" className="bg-slate-900">💰 Budget</option>
                    <option value="workstation" className="bg-slate-900">⚙️ Workstation</option>
                    <option value="streaming" className="bg-slate-900">📡 Streaming</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Badge Text</Label>
                  <Input name="badge_text" defaultValue={build.badge_text} placeholder="Best Seller" className="bg-white/5 border-white/10 text-white h-11" />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Replace Image</Label>
                  <input name="image" type="file" accept="image/*"
                    className="w-full text-slate-300 text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600/20 file:text-blue-400" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <Label className="text-white font-bold text-sm">Featured</Label>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Show on homepage</p>
                    </div>
                    <Switch name="is_featured" defaultChecked={build.is_featured} />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <Label className="text-white font-bold text-sm">Active</Label>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Visible to customers</p>
                    </div>
                    <Switch name="is_active" defaultChecked={build.is_active} />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
