import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Tag } from 'lucide-react';
import { addCategory, deleteCategory } from './actions';

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  
  const parentCategories = categories?.filter(c => !c.parent_id) || [];

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
                <Label htmlFor="name" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Category Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="e.g., Laptops" 
                  className="bg-white/5 border-white/10 text-white h-11"
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
                  {parentCategories.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-slate-900">{cat.name}</option>
                  ))}
                </select>
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
                    <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Slug</TableHead>
                    <TableHead className="text-right text-slate-400 font-bold uppercase tracking-wider text-[11px] px-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories?.map((cat) => (
                    <TableRow key={cat.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="px-6 py-4 font-bold text-white">
                        {cat.name}
                        {cat.parent_id && (
                          <span className="ml-2 text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-500 uppercase">Sub</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                        {cat.parent_id ? `${categories.find(c => c.id === cat.parent_id)?.name} > ` : ''}{cat.slug}
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
                      <TableCell colSpan={3} className="text-center py-12 text-slate-500 font-medium">
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
