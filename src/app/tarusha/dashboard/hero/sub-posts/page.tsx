import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Trash2, Plus, ExternalLink } from 'lucide-react';
import { addHeroSubPost, deleteHeroSubPost } from './actions';
import { AdminMediaUpload } from '@/components/admin/AdminMediaUpload';
import Image from 'next/image';

export default async function HeroSubPostsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from('hero_sub_posts').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Hero Sub Posts</h1>
        <p className="text-slate-400 font-medium">Manage secondary featured cards for new arrivals or brands.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Post Form */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" /> New Sub Post
            </CardTitle>
            <CardDescription className="text-slate-500">Create a promotional card with a link.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addHeroSubPost} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Post Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="e.g., RTX 5090 Available Now" 
                  className="bg-white/5 border-white/10 text-white h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link_url" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Target URL</Label>
                <Input 
                  id="link_url" 
                  name="link_url" 
                  placeholder="/products?category=desktops" 
                  className="bg-white/5 border-white/10 text-white h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Card Images</Label>
                <AdminMediaUpload name="images" multiple required />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl">
                Create Sub Post
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Posts List */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-6">
            {posts?.map((post) => (
              <div key={post.id} className="group relative aspect-video glass rounded-[2.5rem] border-white/5 overflow-hidden transition-all hover:border-primary/50">
                <Image src={post.image_url} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <ExternalLink className="w-3 h-3" /> {post.link_url}
                  </div>
                </div>

                <form action={deleteHeroSubPost} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="image_url" value={post.image_url} />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    type="submit" 
                    className="w-8 h-8 rounded-lg text-white bg-red-600/80 hover:bg-red-600 shadow-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            ))}
            {!posts?.length && (
              <div className="col-span-full py-40 glass rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-slate-600 gap-4">
                 <Sparkles className="w-12 h-12 opacity-20" />
                 <p className="font-black uppercase tracking-widest text-xs opacity-40">No sub posts added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
