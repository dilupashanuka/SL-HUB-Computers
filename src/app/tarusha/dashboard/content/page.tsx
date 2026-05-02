import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Save, Info, ShieldCheck, RefreshCw } from 'lucide-react';
import { updateSiteContent } from './actions';

export default async function SiteContentPage() {
  const supabase = await createClient();
  const { data: contents } = await supabase.from('site_content').select('*');

  const getPageContent = (slug: string) => {
    const item = contents?.find(c => c.page_slug === slug);
    return item ? JSON.stringify(item.content, null, 2) : JSON.stringify({
      title: "",
      body: "",
      sections: []
    }, null, 2);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Dynamic Site Content</h1>
        <p className="text-slate-400 font-medium">Control the text and structure of your policy and information pages.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* About Page */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" /> About Page
              </CardTitle>
              <CardDescription className="text-slate-500">Manage the "Who We Are" content.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form action={updateSiteContent} className="space-y-4">
              <input type="hidden" name="page_slug" value="about" />
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Page Content (JSON Format)</Label>
                <Textarea 
                  name="content" 
                  defaultValue={getPageContent('about')} 
                  rows={15}
                  className="bg-white/5 border-white/10 text-slate-300 font-mono text-xs focus:border-blue-500/50 resize-none"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl">
                <Save className="w-4 h-4 mr-2" /> Update About Page
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Warranty Page */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Warranty & Returns
              </CardTitle>
              <CardDescription className="text-slate-500">Manage policy documentation.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form action={updateSiteContent} className="space-y-4">
              <input type="hidden" name="page_slug" value="warranty" />
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Page Content (JSON Format)</Label>
                <Textarea 
                  name="content" 
                  defaultValue={getPageContent('warranty')} 
                  rows={15}
                  className="bg-white/5 border-white/10 text-slate-300 font-mono text-xs focus:border-emerald-500/50 resize-none"
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl">
                <Save className="w-4 h-4 mr-2" /> Update Warranty Policy
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/5 border-white/5 border-dashed">
        <CardContent className="p-8 text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-slate-700 mx-auto animate-spin-slow" />
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            Content updates use JSON structure to allow for flexible page layouts. Ensure your JSON is valid before saving.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
