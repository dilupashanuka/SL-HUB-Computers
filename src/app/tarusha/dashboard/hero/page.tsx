import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Layout, Upload, Save } from 'lucide-react';
import Image from 'next/image';
import { deleteHeroSlide, updateHeroSlide } from './actions';
import { HeroUploadForm } from './HeroUploadForm';

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
            <HeroUploadForm />
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
                    sizes="(max-width: 768px) 100vw, 33vw"
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
                <div className="flex flex-col h-full p-6 md:col-span-2 space-y-4">
                  <form action={updateHeroSlide} className="space-y-4" encType="multipart/form-data">
                    <input type="hidden" name="id" value={slide.id} />
                    
                    <div className="grid gap-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Slide Title</Label>
                          <Input 
                            name="title" 
                            defaultValue={slide.title} 
                            placeholder="Main Heading"
                            className="bg-white/5 border-white/10 text-white h-9 text-sm" 
                          />
                        </div>
                        
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subtitle</Label>
                          <Input 
                            name="subtitle" 
                            defaultValue={slide.subtitle} 
                            placeholder="Supporting Text"
                            className="bg-white/5 border-white/10 text-white h-9 text-sm" 
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Video URL (Optional)</Label>
                        <Input 
                          name="video_url" 
                          defaultValue={slide.video_url} 
                          placeholder="https://..."
                          className="bg-white/5 border-white/10 text-white h-9 text-sm font-mono" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-blue-400">Change Background Image (Optional)</Label>
                        <Input 
                          type="file"
                          name="image"
                          accept="image/*"
                          className="bg-white/5 border-white/10 text-white h-9 text-xs file:bg-blue-600 file:text-white file:border-0 file:text-[10px] file:font-bold file:px-3 file:mr-3 hover:file:bg-blue-500" 
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-500 text-white font-bold gap-2">
                        <Save className="w-4 h-4" /> Save All Changes
                      </Button>
                    </div>
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
