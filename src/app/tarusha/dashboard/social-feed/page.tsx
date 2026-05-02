import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Share2, Trash2, Link as LinkIcon } from 'lucide-react';
import { addSocialPost, deleteSocialPost } from './actions';

const Facebook = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default async function SocialFeedPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from('social_feed').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Social Feed Control</h1>
        <p className="text-slate-400 font-medium">Link your latest Facebook updates to the live website feed.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Facebook className="w-5 h-5 text-blue-500" /> Sync New Post
            </CardTitle>
            <CardDescription className="text-slate-500">Paste the URL of a public Facebook post.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addSocialPost} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Facebook Post URL</Label>
                <Input 
                  name="fb_post_url" 
                  required 
                  placeholder="https://facebook.com/slhub/posts/..." 
                  className="bg-white/5 border-white/10 text-white h-11"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-blue-600/20">
                Sync Post
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {posts?.map((post) => (
            <Card key={post.id} className="bg-slate-900/40 border-white/5 backdrop-blur-md">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-blue-400">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate uppercase tracking-widest">Active Post Feed</p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{post.fb_post_url}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={post.fb_post_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                  <form action={deleteSocialPost}>
                    <input type="hidden" name="id" value={post.id} />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      type="submit"
                      className="rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
          {!posts?.length && (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <Share2 className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No social updates synced yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
