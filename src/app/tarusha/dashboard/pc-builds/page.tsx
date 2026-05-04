import { createClient } from '@/utils/supabase/server';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus, Star, Edit, Trash2, Cpu, AlertTriangle } from 'lucide-react';
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
  let builds: any[] = [];
  let tableError = false;

  try {
    const { data, error } = await supabase
      .from('pc_builds')
      .select('*, pc_build_components(count)')
      .order('created_at', { ascending: false });
    if (error) tableError = true;
    else builds = data || [];
  } catch {
    tableError = true;
  }

  if (tableError) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">PC Builds — Setup Required</h1>
            <p className="text-slate-400 text-sm">Database tables not found. Run the SQL migration first.</p>
          </div>
        </div>
        <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-[2rem] space-y-4">
          <p className="text-red-400 font-black text-sm uppercase tracking-widest">⚠️ Supabase SQL Editor-ෙ මේ SQL run කරන්න:</p>
          <pre className="text-xs text-slate-300 bg-slate-950 border border-white/10 rounded-2xl p-6 overflow-x-auto whitespace-pre-wrap">
{`-- Run this in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS pc_builds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'gaming',
  badge_text TEXT,
  image_url TEXT,
  total_price NUMERIC DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pc_build_components (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  build_id UUID REFERENCES pc_builds(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  custom_name TEXT,
  custom_price NUMERIC DEFAULT 0,
  quantity INT DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_build_total()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE pc_builds SET
    total_price = (
      SELECT COALESCE(SUM(
        CASE WHEN pbc.product_id IS NOT NULL
          THEN (SELECT price FROM products WHERE id = pbc.product_id) * pbc.quantity
          ELSE pbc.custom_price * pbc.quantity
        END
      ), 0)
      FROM pc_build_components pbc
      WHERE pbc.build_id = COALESCE(NEW.build_id, OLD.build_id)
    ),
    updated_at = now()
  WHERE id = COALESCE(NEW.build_id, OLD.build_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_build_total ON pc_build_components;
CREATE TRIGGER trg_update_build_total
AFTER INSERT OR UPDATE OR DELETE ON pc_build_components
FOR EACH ROW EXECUTE FUNCTION update_build_total();

ALTER TABLE pc_builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE pc_build_components ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active builds" ON pc_builds FOR SELECT USING (is_active = true);
CREATE POLICY "Auth manage builds" ON pc_builds FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public read components" ON pc_build_components FOR SELECT USING (true);
CREATE POLICY "Auth manage components" ON pc_build_components FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS pc_component_type_categories (
  component_type TEXT PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE pc_component_type_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read mappings" ON pc_component_type_categories FOR SELECT USING (true);
CREATE POLICY "Auth manage mappings" ON pc_component_type_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
INSERT INTO pc_component_type_categories (component_type) VALUES
  ('CPU'),('GPU'),('RAM'),('Storage'),('Motherboard'),('PSU'),('Case'),('Cooler'),('Monitor'),('Other')
ON CONFLICT (component_type) DO NOTHING;`}
          </pre>
          <p className="text-slate-400 text-sm">SQL run කළාට පස්සේ මේ page reload කරන්න.</p>
        </div>
      </div>
    );
  }

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
                  <form action={deletePCBuild}>
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
