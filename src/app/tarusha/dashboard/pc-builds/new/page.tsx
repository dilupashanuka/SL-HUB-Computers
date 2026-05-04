import { createPCBuild } from '../actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { ArrowLeft, Cpu } from 'lucide-react';

export default function NewPCBuildPage() {
  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/tarusha/dashboard/pc-builds"
          className="w-10 h-10 flex items-center justify-center glass rounded-xl border border-white/10 text-slate-400 hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">New PC Build</h1>
          <p className="text-slate-400 text-sm">Create a preset build — add components on the next step.</p>
        </div>
      </div>

      <form action={createPCBuild} className="space-y-6">
        <Card className="bg-slate-900/40 border-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" /> Build Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Build Name *</Label>
              <Input name="name" required placeholder="e.g., Ultimate Gaming Beast" className="bg-white/5 border-white/10 text-white h-12" />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Description</Label>
              <Textarea name="description" placeholder="Describe who this build is for and its strengths..." className="bg-white/5 border-white/10 text-white min-h-[100px]" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Category *</Label>
                <select name="category" required className="w-full bg-white/5 border border-white/10 text-white h-12 rounded-lg px-4 focus:outline-none focus:border-blue-500/50">
                  <option value="gaming">🎮 Gaming</option>
                  <option value="office">💼 Office</option>
                  <option value="budget">💰 Budget</option>
                  <option value="workstation">⚙️ Workstation</option>
                  <option value="streaming">📡 Streaming</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Badge Text</Label>
                <Input name="badge_text" placeholder="e.g., Best Seller, New, Hot" className="bg-white/5 border-white/10 text-white h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Build Thumbnail Image</Label>
              <input name="image" type="file" accept="image/*"
                className="w-full text-slate-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-600/30 cursor-pointer" />
            </div>

            <div className="flex gap-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 flex-1">
                <div>
                  <Label className="text-white font-bold">Featured</Label>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Show on homepage</p>
                </div>
                <Switch name="is_featured" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 flex-1">
                <div>
                  <Label className="text-white font-bold">Active</Label>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Visible to customers</p>
                </div>
                <Switch name="is_active" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 uppercase">
          Create Build & Add Components →
        </Button>
      </form>
    </div>
  );
}
