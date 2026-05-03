import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Tag, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { addCategory, deleteCategory } from './actions';

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Category Management</h1>
        <p className="text-slate-400 font-medium">Manage product categories for your inventory terminal.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Category Form */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" /> New Category
            </CardTitle>
            <CardDescription className="text-slate-500">Add a new category to the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addCategory} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inventory_type" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Main Inventory</Label>
                <select 
                  id="inventory_type" 
                  name="inventory_type" 
                  required
                  className="w-full bg-white/5 border border-white/10 text-white h-11 rounded-md px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" className="bg-slate-900">Select Inventory...</option>
                  <option value="workstations" className="bg-slate-900">Workstations (Computers & Laptops)</option>
                  <option value="flagships" className="bg-slate-900">Flagships (Phones & Tablets)</option>
                  <option value="components" className="bg-slate-900">Components (PC Parts & Accessories)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Category Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="e.g., Laptops, Asus, ROG" 
                  className="bg-white/5 border-white/10 text-white h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Description</Label>
                <textarea 
                  id="description" 
                  name="description" 
                  placeholder="Short description for Shop by Power section" 
                  className="w-full bg-white/5 border border-white/10 text-white rounded-md p-3 min-h-[80px] focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Category Image</Label>
                <Input 
                  id="image" 
                  name="image" 
                  type="file" 
                  accept="image/*"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent_id" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Parent Category (Optional)</Label>
                <select 
                  id="parent_id" 
                  name="parent_id" 
                  className="w-full bg-white/5 border border-white/10 text-white h-11 rounded-md px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" className="bg-slate-900">None (Top Level)</option>
                  {categories?.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-slate-900">
                      {cat.inventory_type ? `[${cat.inventory_type.toUpperCase()}] ` : ''}{cat.name}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500">Nest categories to create Brands or Models (e.g. Workstations &gt; Asus &gt; ROG).</p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="is_featured" 
                  name="is_featured" 
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="is_featured" className="text-slate-300 font-medium text-sm">Feature on Homepage</Label>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl">
                Add Category
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-400" /> System Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px] py-6 px-6">Name</TableHead>
                    <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Inventory</TableHead>
                    <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Path</TableHead>
                    <TableHead className="text-right text-slate-400 font-bold uppercase tracking-wider text-[11px] px-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories?.map((cat) => (
                    <TableRow key={cat.id} className="border-white/5 hover:bg-white/5 transition-all duration-300">
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                            {cat.image_url ? (
                              <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-700">
                                <ImageIcon className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-white text-base">{cat.name}</span>
                            {cat.is_featured && (
                              <span className="w-fit text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full uppercase font-black tracking-widest">Homepage Featured</span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                          {cat.inventory_type}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                        {cat.parent_id ? (
                          <span className="flex items-center gap-1">
                            {categories.find(c => c.id === cat.parent_id)?.name}
                            <ChevronDown className="w-3 h-3 -rotate-90" />
                            {cat.slug}
                          </span>
                        ) : cat.slug}
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <form action={deleteCategory}>
                          <input type="hidden" name="id" value={cat.id} />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            type="submit" 
                            className="w-9 h-9 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!categories?.length && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-slate-500 font-medium">
                        No categories defined.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
