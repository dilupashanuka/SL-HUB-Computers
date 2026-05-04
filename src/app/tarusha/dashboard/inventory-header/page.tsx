import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Trash2, Plus, Save, ImageIcon, FileText } from 'lucide-react';
import { addInventorySlide, deleteInventorySlide, updateInventoryHeaderText } from './actions';
import { AdminMediaUpload } from '@/components/admin/AdminMediaUpload';
import Image from 'next/image';

export default async function InventoryHeaderPage() {
  const supabase = await createClient();
  const { data: slides } = await supabase
    .from('inventory_slides')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 'inventory_header_text')
    .single();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Inventory Header Manager</h1>
        <p className="text-slate-400 font-medium">Manage the permanent text and dynamic background images for the Shop page.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Text Content Form */}
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" /> Header Text Content
              </CardTitle>
              <CardDescription className="text-slate-500">This text remains static while images rotate.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={updateInventoryHeaderText} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Main Title</Label>
                  <Input 
                    name="title" 
                    defaultValue={settings?.inventory_title || "Explore Our Premium Inventory"}
                    className="bg-white/5 border-white/10 text-white h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Subtitle</Label>
                  <Textarea 
                    name="subtitle" 
                    defaultValue={settings?.inventory_subtitle || "Find the perfect machine for your needs. We stock only the most reliable brands with guaranteed islandwide warranty."}
                    className="bg-white/5 border-white/10 text-white min-h-[120px]"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-blue-600/20">
                  <Save className="w-4 h-4 mr-2" /> Save Header Text
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Add Slides Form */}
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" /> Add New Slides
              </CardTitle>
              <CardDescription className="text-slate-500">Upload images for the background carousel.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addInventorySlide} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider text-blue-400">Select Images (Bulk Upload)</Label>
                  <AdminMediaUpload name="images" multiple required />
                </div>

                <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold h-11 rounded-xl">
                  Upload Slides
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Existing Slides List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 px-2">
            <ImageIcon className="w-5 h-5 text-blue-400" /> Slideshow Gallery
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {slides?.map((slide) => (
              <Card key={slide.id} className="group relative aspect-video glass rounded-[2.5rem] border-white/5 overflow-hidden transition-all hover:border-primary/50">
                <Image src={slide.image_url} alt="Inventory Slide" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <form action={deleteInventorySlide}>
                    <input type="hidden" name="id" value={slide.id} />
                    <input type="hidden" name="image_url" value={slide.image_url} />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      type="submit" 
                      className="w-10 h-10 rounded-xl text-white bg-red-600/80 hover:bg-red-600 shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </Card>
            ))}

            {!slides?.length && (
              <div className="col-span-full py-20 glass rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-slate-600 gap-4">
                 <Sparkles className="w-12 h-12 opacity-20" />
                 <p className="font-black uppercase tracking-widest text-xs opacity-40 text-center">
                   No images in gallery.<br/>Upload images to enable the background carousel.
                 </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
