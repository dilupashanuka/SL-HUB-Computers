import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { addPartner, deletePartner } from './actions';
import { AdminMediaUpload } from '@/components/admin/AdminMediaUpload';
import Image from 'next/image';

export default async function PartnersPage() {
  const supabase = await createClient();
  const { data: partners } = await supabase.from('partners').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Global Partners</h1>
        <p className="text-slate-400 font-medium">Manage authorized retailer & brand logos for the homepage.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Partner Form */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" /> New Brands
            </CardTitle>
            <CardDescription className="text-slate-500">Upload one or more brand logos.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addPartner} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Brand Name (Optional)</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Leave empty for bulk upload" 
                  className="bg-white/5 border-white/10 text-white h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Brand Logos</Label>
                <AdminMediaUpload name="logos" multiple required />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl">
                Add to Showcase
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Partners List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {partners?.map((partner) => (
              <div key={partner.id} className="group relative aspect-square glass rounded-[2rem] border-white/5 overflow-hidden flex items-center justify-center p-6 transition-all hover:border-primary/50">
                <div className="relative w-full h-20 mb-2">
                  <Image 
                    src={partner.logo_url} 
                    alt={partner.name} 
                    fill 
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                  />
                </div>
                
                <div className="w-full text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                    {partner.name}
                  </span>
                </div>

                <form action={deletePartner} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input type="hidden" name="id" value={partner.id} />
                  <input type="hidden" name="logo_url" value={partner.logo_url} />
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
            {!partners?.length && (
              <div className="col-span-full py-32 glass rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-slate-600 gap-4">
                 <ImageIcon className="w-12 h-12 opacity-20" />
                 <p className="font-black uppercase tracking-widest text-xs opacity-40">No brands added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
