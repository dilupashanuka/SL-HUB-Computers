import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Cpu, Link2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { upsertComponentMapping } from '../actions';

const COMPONENT_TYPES = ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU', 'Case', 'Cooler', 'Monitor', 'Other'];

export default async function ComponentMappingPage() {
  const supabase = await createClient();

  const { data: mappings } = await supabase
    .from('pc_component_type_categories')
    .select('*, categories(id, name)');

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');

  const mappingMap = Object.fromEntries(
    (mappings || []).map(m => [m.component_type, m])
  );

  return (
    <div className="space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/tarusha/dashboard/pc-builds"
          className="w-10 h-10 flex items-center justify-center glass rounded-xl border border-white/10 text-slate-400 hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Component Category Mapping</h1>
          <p className="text-slate-400 text-sm mt-1">
            Each PC Builder step ekata inventory category ekak assign karanna. 
            Ethakota customer e step-eke yamu wena wita, e category-eke products wissai show wenawa.
          </p>
        </div>
      </div>

      <Card className="bg-slate-900/40 border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-blue-400" />
            Component → Category Links
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {COMPONENT_TYPES.map((type) => {
              const mapping = mappingMap[type];
              const hasMapping = !!mapping?.category_id;

              return (
                <form key={type} action={upsertComponentMapping}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                  <input type="hidden" name="component_type" value={type} />

                  {/* Status dot */}
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${hasMapping ? 'bg-green-500' : 'bg-slate-600'}`} />

                  {/* Component Type */}
                  <div className="w-36 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-white font-bold text-sm uppercase tracking-widest">{type}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-slate-600 font-black">→</div>

                  {/* Category Selector */}
                  <select
                    name="category_id"
                    defaultValue={mapping?.category_id || ''}
                    className="flex-1 bg-white/5 border border-white/10 text-white h-10 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  >
                    <option value="" className="bg-slate-900 text-slate-400">— Not mapped (show all products) —</option>
                    {categories?.map(cat => (
                      <option key={cat.id} value={cat.id} className="bg-slate-900">
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  {/* Save Button */}
                  <Button type="submit" size="sm"
                    className="bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 rounded-xl px-4 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 mr-1" /> Save
                  </Button>
                </form>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
        <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">💡 How it works</p>
        <p className="text-slate-400 text-sm">
          "CPU" → "Processors" assign karanna. Ethakota customer PC Builder-eke "Processor" step-eke yamu wena wita, 
          inventory-eke "Processors" category-eke thiyana products wissai display wenawa.
          Category assign natta okkoma products show wenawa.
        </p>
      </div>
    </div>
  );
}
