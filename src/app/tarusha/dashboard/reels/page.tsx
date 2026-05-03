import { createClient } from "@/utils/supabase/server";
import { Play, Plus, Trash2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminMediaUpload } from "@/components/admin/AdminMediaUpload";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function ReelsPage() {
  const supabase = await createClient();
  
  const { data: reels } = await supabase
    .from('video_reels')
    .select('*')
    .order('created_at', { ascending: false });

  async function addReel(formData: FormData) {
    "use server"
    const supabase = await createClient();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const videoFile = formData.get('video') as File;

    if (!videoFile || videoFile.size === 0) return;

    const fileExt = videoFile.name.split('.').pop();
    const fileName = `reel-${Date.now()}.${fileExt}`;
    const filePath = `reels/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('hero')
      .upload(filePath, videoFile);

    if (uploadError) return;

    const { data: { publicUrl } } = supabase.storage
      .from('hero')
      .getPublicUrl(filePath);

    await supabase.from('video_reels').insert({
      title,
      category,
      video_url: publicUrl,
    });

    revalidatePath('/tarusha/dashboard/reels');
    revalidatePath('/');
  }

  async function deleteReel(id: string) {
    "use server"
    const supabase = await createClient();
    await supabase.from('video_reels').delete().eq('id', id);
    revalidatePath('/tarusha/dashboard/reels');
    revalidatePath('/');
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Tech Reels</h1>
          <p className="text-slate-500 font-medium">Manage TikTok-style videos for the homepage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="p-8 rounded-3xl glass border-white/5 bg-slate-900/40 sticky top-28">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" /> Add New Reel
            </h2>
            <form action={addReel} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reel Title</label>
                <input 
                  name="title" 
                  required 
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-blue-500/50 transition-all outline-none"
                  placeholder="e.g. RTX 4090 Build"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</label>
                <input 
                  name="category" 
                  required 
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-blue-500/50 transition-all outline-none"
                  placeholder="e.g. PC Build"
                  defaultValue="PC Build"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Video File</label>
                <AdminMediaUpload name="video" accept="video/*" />
              </div>
              <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all">
                Upload Reel
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reels?.map((reel) => (
              <div key={reel.id} className="group relative aspect-[9/16] rounded-3xl overflow-hidden glass border-white/5 bg-slate-900/40">
                <video 
                  src={reel.video_url} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                  muted 
                  loop 
                  onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                  onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1 block">{reel.category}</span>
                  <h3 className="text-lg font-bold text-white mb-4">{reel.title}</h3>
                  <form action={async () => {
                    "use server"
                    const supabase = await createClient();
                    await supabase.from('video_reels').delete().eq('id', reel.id);
                    revalidatePath('/tarusha/dashboard/reels');
                  }}>
                    <Button variant="destructive" size="sm" className="w-full gap-2 rounded-xl h-10 font-bold bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20">
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  </form>
                </div>
              </div>
            ))}

            {(!reels || reels.length === 0) && (
              <div className="col-span-full h-64 rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-slate-600 gap-4">
                <Video className="w-12 h-12 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs">No reels uploaded yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
