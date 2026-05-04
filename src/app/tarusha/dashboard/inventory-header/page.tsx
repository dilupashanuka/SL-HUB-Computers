import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash2, Plus, Save, ImageIcon } from 'lucide-react';
import { addInventorySlide, deleteInventorySlide, updateInventoryHeader } from './actions';
import { AdminMediaUpload } from '@/components/admin/AdminMediaUpload';
import Image from 'next/image';

export default async function InventoryHeaderPage() {
  const supabase = await createClient();
  const { data: slides } = await supabase
    .from('inventory_slides')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Inventory Header Manager</h1>
        <p className="text-slate-400 font-medium">Manage the title, subtitle and hero images for the Shop page.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Section */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" /> New Header Content
            </CardTitle>
            <CardDescription className="text-slate-500">Upload images and set initial text.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addInventorySlide} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Main Title</Label>
                <Input 
                  name="title" 
                  defaultValue="Explore Our Premium Inventory"
                  className="bg-white/5 border-white/10 text-white h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Subtitle</Label>
                <Textarea 
                  name="subtitle" 
                  defaultValue="Find the perfect machine for your needs. We stock only the most reliable brands with guaranteed islandwide warranty."
                  className="bg-white/5 border-white/10 text-white min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider text-blue-400">Header Images (Bulk Upload)</Label>
                <AdminMediaUpload name="images" multiple required />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-blue-600/20">
                Upload & Create Slides
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Slides List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 px-2">
            <ImageIcon className="w-5 h-5 text-purple-400" /> Current Slideshow
          </h2>
          
          <div className="grid gap-6">
            {slides?.map((slide) => (
              <Card key={slide.id} className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden">
                <div className="grid md:grid-cols-3">
                  <div className="relative aspect-video md:aspect-square h-full min-h-[200px]">
                    <Image 
                      src={slide.image_url} 
                      alt={slide.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  
                  <CardContent className="md:col-span-2 p-6">
                    <form action={updateInventoryHeader} className="space-y-4">
                      <input type="hidden" name="id" value={slide.id} />
                      
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Section Title</Label>
                          <Input 
                            name="title" 
                            defaultValue={slide.title}
                            className="bg-white/5 border-white/10 text-white h-9 text-sm font-bold"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subtitle Description</Label>
                          <Textarea 
                            name="subtitle" 
                            defaultValue={slide.subtitle}
                            className="bg-white/5 border-white/10 text-white text-xs min-h-[80px]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-500 text-white font-bold gap-2">
                          <Save className="w-4 h-4" /> Save Content
                        </Button>

                        <form action={deleteInventorySlide}>
                          <input type="hidden" name="id" value={slide.id} />
                          <input type="hidden" name="image_url" value={slide.image_url} />
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                            <Trash2 className="w-4 h-4 mr-2" /> Remove
                          </Button>
                        </form>
                      </div>
                    </form>
                  </CardContent>
                </div>
              </Card>
            ))}

            {!slides?.length && (
              <div className="py-20 glass rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-slate-600 gap-4">
                 <Sparkles className="w-12 h-12 opacity-20" />
                 <p className="font-black uppercase tracking-widest text-xs opacity-40 text-center">
                   No header slides detected.<br/>Add images to enable the shop header.
                 </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
