import { createClient } from '@/utils/supabase/server';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus, Star, Edit, Trash2, Cpu, Monitor, Smartphone, Zap, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { deletePCBuild, toggleBuildFeatured } from './actions';
import { Button } from '@/components/ui/button';

const CATEGORY_STYLES: Record<string, { color: string; label: string }> = {
  gaming:      { color: 'text-red-400 bg-red-400/10 border-red-400/20',      label: '🎮 Gaming' },
  office:      { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20',    label: '💼 Office' },
  budget:      { color: 'text-green-400 bg-green-400/10 border-green-400/20', label: '💰 Budget' },
  workstation: { color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', label: '⚙️ Workstation' },
  streaming:   { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', label: '📡 Streaming' },
};

export default async function PCBuildsAdminPage() {
  const supabase = await createClient();
  const { data: builds } = await supabase
    .from('pc_builds')
    .select('*, pc_build_components(count)')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">PC Builds</h1>
          </div>
          <p className="text-slate-400">Manage preset PC builds shown to customers. ({builds?.length || 0} builds)</p>
        </div>
        <Link
          href="/tarusha/dashboard/pc-builds/new"
          className={cn(buttonVariants(), "bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl h-12 px-6 shadow-lg shadow-blue-600/20")}
        >
          <Plus className="w-4 h-4 mr-2" /> New Build
        </Link>
      </div>

      {/* Builds Grid */}
      {builds && builds.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {builds.map((build) => {
            const style = CATEGORY_STYLES[build.category] || CATEGORY_STYLES.gaming;
            return (
              <div key={build.id} className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-6 space-y-4 hover:border-white/10 transition-all group">
                {/* Top Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={cn("px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border", style.color)}>
                        {style.label}
                      </span>
                      {build.badge_text && (
                        <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
                          {build.badge_text}
                        </span>
                      )}
                      {build.is_featured && (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                      {build.name}
                    </h3>
                    {build.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{build.description}</p>
                    )}
                  </div>
                  <div className={cn("w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0", build.is_active ? 'bg-green-500' : 'bg-red-500')} />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Total Price</p>
                    <p className="text-white font-black">
                      {build.total_price ? `Rs. ${Number(build.total_price).toLocaleString()}` : 'TBD'}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Components</p>
                    <p className="text-white font-black">
                      {(build.pc_build_components as any)?.[0]?.count ?? 0} parts
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/tarusha/dashboard/pc-builds/${build.id}`}
                    className={cn(buttonVariants({ size: 'sm' }), "flex-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 rounded-xl")}
                  >
                    <Edit className="w-4 h-4 mr-2" /> Manage
                  </Link>
                  <form action={toggleBuildFeatured}>
                    <input type="hidden" name="id" value={build.id} />
                    <input type="hidden" name="is_featured" value={String(build.is_featured)} />
                    <Button variant="ghost" size="sm" type="submit"
                      className={cn("rounded-xl border", build.is_featured ? "border-yellow-500/30 text-yellow-400 hover:bg-yellow-400/10" : "border-white/10 text-slate-500 hover:text-yellow-400")}
                      title={build.is_featured ? "Unfeature" : "Feature on homepage"}
                    >
                      <Star className={cn("w-4 h-4", build.is_featured && "fill-yellow-400")} />
                    </Button>
                  </form>
                  <form action={deletePCBuild} onSubmit={(e) => !confirm('Delete this build?') && e.preventDefault()}>
                    <input type="hidden" name="id" value={build.id} />
                    <Button variant="ghost" size="sm" type="submit"
                      className="rounded-xl border border-white/10 text-slate-500 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center gap-6 text-center bg-slate-900/20 border border-white/5 rounded-[3rem]">
          <Cpu className="w-16 h-16 text-slate-700" />
          <div>
            <p className="text-white font-black text-xl uppercase tracking-tighter mb-2">No Builds Yet</p>
            <p className="text-slate-500 text-sm">Create your first preset PC build to show customers.</p>
          </div>
          <Link href="/tarusha/dashboard/pc-builds/new" className={cn(buttonVariants(), "bg-blue-600 text-white")}>
            <Plus className="w-4 h-4 mr-2" /> Create First Build
          </Link>
        </div>
      )}
    </div>
  );
}
