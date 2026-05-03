import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Video, Trash2, Plus, Play } from 'lucide-react';
import { addHeroVideo, deleteHeroVideo } from './actions';
import { AdminMediaUpload } from '@/components/admin/AdminMediaUpload';

export default async function HeroVideosPage() {
  const supabase = await createClient();
  const { data: videos } = await supabase.from('hero_videos').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Hero Videos</h1>
        <p className="text-slate-400 font-medium">Manage cinematic video backgrounds for the homepage hero section.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Video Form */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" /> New Video
            </CardTitle>
            <CardDescription className="text-slate-500">Upload a high-quality MP4 video.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addHeroVideo} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Title Overlay</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="e.g., Ultimate Gaming PC" 
                  className="bg-white/5 border-white/10 text-white h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Subtitle</Label>
                <Textarea 
                  id="subtitle" 
                  name="subtitle" 
                  placeholder="e.g., Powered by NVIDIA RTX 4090" 
                  className="bg-white/5 border-white/10 text-white min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Video File</Label>
                <AdminMediaUpload name="video" accept="video/mp4,video/webm" required />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl">
                Upload Hero Video
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Videos List */}
        <div className="lg:col-span-2 space-y-6">
          {videos?.map((vid) => (
            <Card key={vid.id} className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden group">
              <div className="grid md:grid-cols-2">
                <div className="aspect-video relative bg-black">
                  <video src={vid.video_url} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white fill-current" />
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">{vid.title || 'Untitled Video'}</h3>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">{vid.subtitle}</p>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-400/10 px-3 py-1 rounded-full">Active Content</span>
                    <form action={deleteHeroVideo}>
                      <input type="hidden" name="id" value={vid.id} />
                      <input type="hidden" name="video_url" value={vid.video_url} />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        type="submit" 
                        className="text-red-500 hover:text-red-400 hover:bg-red-400/10 font-bold gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Remove Video
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {!videos?.length && (
            <div className="py-40 glass rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-slate-600 gap-4">
               <Video className="w-12 h-12 opacity-20" />
               <p className="font-black uppercase tracking-widest text-xs opacity-40">No hero videos added</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
