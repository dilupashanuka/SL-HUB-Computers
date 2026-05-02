import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Layout, Upload, Save } from 'lucide-react';
import Image from 'next/image';
import { uploadHeroSlides, deleteHeroSlide, updateHeroSlide } from './actions';

export default async function HeroShowcasePage() {
  const supabase = await createClient();
  const { data: slides } = await supabase.from('hero_slides').select('*').order('order', { ascending: true });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Hero Showcase</h1>
        <p className="text-slate-400 font-medium">Manage home page slider images and branding content.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-400" /> Bulk Upload
            </CardTitle>
            <CardDescription className="text-slate-500">Upload multiple images for the home slider.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={uploadHeroSlides} className="space-y-4">
              <div className="aspect-video rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-pointer bg-white/5 relative">
                <input 
                  type="file" 
                  name="images" 
                  multiple 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  accept="image/*"
                  required
                />
                <Plus className="w-8 h-8 mb-2" />
                <span className="text-xs font-bold uppercase tracking-widest text-center px-4">Click to select slider images</span>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl">
                Add to Showcase
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Slides List */}
        <div className="lg:col-span-2 space-y-6">
          {slides?.map((slide) => (
            <Card key={slide.id} className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden group">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="relative aspect-video md:aspect-auto">
                  <Image 
                    src={slide.image_url} 
                    alt="Hero Slide" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <form action={deleteHeroSlide}>
                      <input type="hidden" name="id" value={slide.id} />
                      <input type="hidden" name="imageUrl" value={slide.image_url} />
                      <Button variant="destructive" size="icon" className="rounded-full w-12 h-12">
                        <Trash2 className="w-6 h-6" />
                      </Button>
                    </form>
                  </div>
                </div>
                <div className="md:col-span-2 p-6">
                  <form action={updateHeroSlide} className="space-y-4">
                    <input type="hidden" name="id" value={slide.id} />
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Heading</Label>
                      <Input 
                        name="title" 
                        defaultValue={slide.title} 
                        className="bg-white/5 border-white/10 text-white font-bold h-10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sub Heading</Label>
                      <Input 
                        name="subtitle" 
                        defaultValue={slide.subtitle} 
                        className="bg-white/5 border-white/10 text-slate-400 h-10" 
                      />
                    </div>
                    <Button type="submit" variant="outline" className="w-full border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5">
                      <Save className="w-3.5 h-3.5 mr-2" /> Save Content
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          ))}
          {!slides?.length && (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <Layout className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 font-medium tracking-tight">No showcase slides found. Upload your first image to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
