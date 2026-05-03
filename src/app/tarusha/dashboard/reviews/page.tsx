import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Trash2, MessageCircle, User, Upload } from 'lucide-react';
import Image from 'next/image';
import { addReview, deleteReview } from './actions';

export default async function ReviewsPage() {
  const supabase = await createClient();
  const { data: reviews } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Customer Testimonials</h1>
        <p className="text-slate-400 font-medium">Showcase what your clients say about SL HUB COMPUTER.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" /> New Testimonial
            </CardTitle>
            <CardDescription className="text-slate-500">Add a client's review manually.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addReview} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Client Name</Label>
                <Input 
                  name="customer_name" 
                  required 
                  placeholder="e.g., John Doe" 
                  className="bg-white/5 border-white/10 text-white h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Rating (1-5)</Label>
                <Input 
                  name="rating" 
                  type="number" 
                  min="1" 
                  max="5" 
                  defaultValue="5" 
                  required 
                  className="bg-white/5 border-white/10 text-white h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Review Content</Label>
                <Textarea 
                  name="review_text" 
                  required 
                  rows={4}
                  placeholder="What did they say?" 
                  className="bg-white/5 border-white/10 text-white resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Client Photo (Optional)</Label>
                <Input 
                  name="avatar" 
                  type="file" 
                  accept="image/*"
                  className="bg-white/5 border-white/10 text-white h-11 cursor-pointer"
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl">
                Publish Review
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          {reviews?.map((review) => (
            <Card key={review.id} className="bg-slate-900/40 border-white/5 backdrop-blur-md relative group">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                    {review.avatar_url ? (
                      <Image src={review.avatar_url} alt={review.customer_name} fill sizes="48px" className="object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-none">{review.customer_name}</h3>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <form action={deleteReview}>
                      <input type="hidden" name="id" value={review.id} />
                      <Button variant="ghost" size="icon" className="text-slate-500 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed italic">
                  "{review.review_text}"
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-tighter">
                    Verified Purchase
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {!reviews?.length && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <Star className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No testimonials published yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
