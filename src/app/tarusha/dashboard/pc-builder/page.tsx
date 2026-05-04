import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Cpu, Trash2, Plus, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import { addPCSlide, deletePCSlide, togglePCSlide, updatePCSlide } from './actions';
import { AdminMediaUpload } from '@/components/admin/AdminMediaUpload';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Save } from 'lucide-react';

export default async function PCBuilderAdminPage() {
  const supabase = await createClient();
  const { data: slides } = await supabase
    .from('pc_builder_slides')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center gap-4">
          <Cpu className="w-10 h-10 text-blue-500" />
          PC Builder Manager
        </h1>
        <p className="text-slate-400 font-medium">Customize the PC Builder CTA section on the homepage.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Slide Form */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" /> Add New CTA
            </CardTitle>
            <CardDescription className="text-slate-500">Create a new background and text for the PC builder section.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addPCSlide} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="e.g., Build Your Masterpiece" 
                  className="bg-white/5 border-white/10 text-white h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Tell users about your PC builder tool..." 
                  className="bg-white/5 border-white/10 text-white min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Background Image</Label>
                <AdminMediaUpload name="images" multiple />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl">
                Update Section
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Slides List */}
        <div className="lg:col-span-2 space-y-4">
          {slides?.map((slide) => (
            <div key={slide.id} className="group relative glass rounded-[2rem] border-white/5 overflow-hidden flex flex-col md:flex-row gap-6 p-6 transition-all hover:border-primary/30">
              <div className="relative w-full md:w-64 h-40 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                <Image 
                  src={slide.image_url} 
                  alt={slide.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {!slide.is_active && (
                  <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Inactive</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-4 py-2">
                <form action={updatePCSlide} className="space-y-4" encType="multipart/form-data">
                  <input type="hidden" name="id" value={slide.id} />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title</Label>
                          <Input 
                            name="title" 
                            defaultValue={slide.title} 
                            className="bg-white/5 border-white/10 text-white h-9 text-sm font-bold" 
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-blue-400">Update Image (Optional)</Label>
                          <Input 
                            type="file"
                            name="image"
                            accept="image/*"
                            className="bg-white/5 border-white/10 text-white h-9 text-[10px] file:bg-blue-600 file:text-white file:border-0 file:px-2 file:mr-2" 
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</Label>
                        <Textarea 
                          name="description" 
                          defaultValue={slide.description} 
                          className="bg-white/5 border-white/10 text-white text-xs min-h-[60px]" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button 
                        type="submit"
                        size="icon" 
                        className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                        title="Save Changes"
                      >
                        <Save className="w-5 h-5" />
                      </Button>
                      
                      <Button 
                        onClick={() => togglePCSlide(slide.id, slide.is_active)}
                        variant="ghost" 
                        size="icon" 
                        type="button"
                        className={cn(
                          "w-10 h-10 rounded-xl border border-white/5",
                          slide.is_active ? "text-green-400 bg-green-400/10" : "text-slate-500 bg-white/5"
                        )}
                      >
                        {slide.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </Button>
                    </div>
                  </div>
                </form>
                
                <div className="flex justify-end pt-2 border-t border-white/5">
                  <form action={deletePCSlide}>
                    <input type="hidden" name="id" value={slide.id} />
                    <input type="hidden" name="image_url" value={slide.image_url} />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      type="submit" 
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 text-[10px] font-bold uppercase tracking-wider gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Item
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ))}
          
          {!slides?.length && (
            <div className="py-32 glass rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-slate-600 gap-4">
               <Cpu className="w-12 h-12 opacity-20" />
               <p className="font-black uppercase tracking-widest text-xs opacity-40">No PC builder content added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
