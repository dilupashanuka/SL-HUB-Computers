import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Layout, Upload, Save, FileText, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { deleteHeroSlide, updateHeroSlide, updateHeroGlobalText } from './actions';
import { HeroUploadForm } from './HeroUploadForm';

export default async function HeroShowcasePage() {
  const supabase = await createClient();
  const { data: slides } = await supabase.from('hero_slides').select('*').order('created_at', { ascending: false });
  const { data: settings } = await supabase.from('site_settings').select('*').single();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Global Hero Settings */}
      <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" /> Global Hero Text
          </CardTitle>
          <CardDescription className="text-slate-500">This content stays fixed while the background media slides rotate.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateHeroGlobalText} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Main Heading</Label>
                <Input 
                  name="title" 
                  defaultValue={settings?.hero_title || "SL HUB COMPUTER"}
                  className="bg-white/5 border-white/10 text-white h-12 text-lg font-black tracking-tight"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Sub Heading</Label>
                <Textarea 
                  name="subtitle" 
                  defaultValue={settings?.hero_subtitle || "The New Experience of Technology"}
                  className="bg-white/5 border-white/10 text-white min-h-[100px] resize-none"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Optional Video Action URL</Label>
                <Input 
                  name="video_url" 
                  defaultValue={settings?.hero_video_url}
                  placeholder="Direct link to mp4/youtube"
                  className="bg-white/5 border-white/10 text-blue-400 font-mono h-12"
                />
                <p className="text-[10px] text-slate-500 font-medium">If set, the hero button will link to this URL.</p>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest h-14 rounded-2xl shadow-xl shadow-blue-600/20">
                  <Save className="w-4 h-4 mr-2" /> Commit Hero Branding
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8 pt-8 border-t border-white/5">
        <div className="space-y-8">
          {/* Upload Form */}
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-400" /> Background Media
              </CardTitle>
              <CardDescription className="text-slate-500">Upload multiple images/videos for the background.</CardDescription>
            </CardHeader>
            <CardContent>
              <HeroUploadForm />
            </CardContent>
          </Card>
        </div>

        {/* Slides List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 px-2">
            <Sparkles className="w-5 h-5 text-blue-400" /> Active Background Gallery
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {slides?.map((slide) => (
              <Card key={slide.id} className="group relative aspect-video glass rounded-[2.5rem] border-white/5 overflow-hidden">
                <Image src={slide.image_url} alt="Hero Background" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <form action={deleteHeroSlide}>
                    <input type="hidden" name="id" value={slide.id} />
                    <input type="hidden" name="imageUrl" value={slide.image_url} />
                    <Button variant="ghost" size="icon" type="submit" className="w-10 h-10 rounded-xl bg-red-600/80 hover:bg-red-600 text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </form>
                </div>

                {slide.video_url && (
                   <div className="absolute bottom-4 left-4">
                      <div className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-[8px] font-black uppercase tracking-widest text-blue-400 backdrop-blur-md">
                         Video Background Active
                      </div>
                   </div>
                )}
              </Card>
            ))}
            {!slides?.length && (
              <div className="col-span-full py-20 text-center glass rounded-[3rem] border border-dashed border-white/5">
                <Layout className="w-12 h-12 text-slate-700 mx-auto mb-4 opacity-20" />
                <p className="text-slate-500 font-medium tracking-tight">No background media found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

