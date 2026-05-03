"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface HeroSubPost {
  id: string;
  image_url: string;
  title: string;
  link_url: string;
}

interface HeroSubPostsProps {
  posts: HeroSubPost[];
}

export function HeroSubPosts({ posts }: HeroSubPostsProps) {
  if (!posts?.length) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
              <Sparkles className="w-4 h-4" /> 
              Featured Updates
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              New <span className="text-gradient">Arrivals</span> & Brands
            </h2>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-xs text-right">
            Explore the latest additions to our premium tech ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={post.link_url} className="group block relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all hover:border-primary/50 shadow-2xl">
                <Image 
                  src={post.image_url} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
                        Learn More
                      </span>
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
