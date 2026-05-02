import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, Trash2, Plus, MessageSquare } from 'lucide-react';
import { addFaq, deleteFaq } from './actions';

export default async function FaqPage() {
  const supabase = await createClient();
  const { data: faqs } = await supabase.from('faqs').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Help Center / FAQ</h1>
        <p className="text-slate-400 font-medium">Manage frequently asked questions to reduce customer inquiries.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" /> New FAQ Item
            </CardTitle>
            <CardDescription className="text-slate-500">Create a new question and answer pair.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addFaq} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Category</Label>
                <select 
                  name="category" 
                  required 
                  className="w-full bg-white/5 border border-white/10 text-white h-11 rounded-xl px-4 focus:outline-none focus:border-blue-500/50 appearance-none text-sm"
                >
                  <option value="General" className="bg-slate-900">General</option>
                  <option value="Shipping" className="bg-slate-900">Shipping</option>
                  <option value="Warranty" className="bg-slate-900">Warranty</option>
                  <option value="Returns" className="bg-slate-900">Returns</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Question</Label>
                <Input 
                  name="question" 
                  required 
                  placeholder="e.g., Do you offer islandwide delivery?" 
                  className="bg-white/5 border-white/10 text-white h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Answer</Label>
                <Textarea 
                  name="answer" 
                  required 
                  rows={5}
                  placeholder="Provide a clear and concise answer..." 
                  className="bg-white/5 border-white/10 text-white resize-none"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 rounded-xl">
                Create FAQ
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {faqs?.map((faq) => (
            <Card key={faq.id} className="bg-slate-900/40 border-white/5 backdrop-blur-md group">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    {faq.category}
                  </span>
                  <form action={deleteFaq}>
                    <input type="hidden" name="id" value={faq.id} />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
                <CardTitle className="text-white text-lg mt-2">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
          {!faqs?.length && (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <HelpCircle className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Your FAQ list is currently empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
