"use client"

import { Star, Quote, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  avatar_url?: string;
  created_at: string;
}

export function ReviewsSection({ reviews = [] }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-40 relative overflow-hidden bg-slate-950">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Trust & Quality</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            What Our <span className="text-gradient">Customers</span> Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="p-10 rounded-[2.5rem] glass border-white/5 relative group hover:border-primary/30 transition-all duration-500">
              <Quote className="absolute top-10 right-10 w-12 h-12 text-white/5 group-hover:text-primary/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                        "w-4 h-4",
                        i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"
                    )} 
                  />
                ))}
              </div>

              <p className="text-lg text-slate-300 font-medium leading-relaxed mb-8 italic">
                "{review.review_text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-black relative">
                  {review.avatar_url ? (
                    <Image src={review.avatar_url} alt={review.customer_name} fill sizes="48px" className="object-cover" />
                  ) : (
                    review.customer_name.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm">{review.customer_name}</h4>
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
