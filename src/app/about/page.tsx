import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShieldCheck, Trophy, Target, Heart, Sparkles, ChevronRight, MessageCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | SL HUB COMPUTER',
  description: 'Learn about the legacy of SL HUB COMPUTER. Since our inception in Deiyandara, we have been providing premium computers and tech accessories with quality without compromise.',
  keywords: 'SL HUB story, about SL HUB COMPUTER, computer shop Deiyandara, tech retail Sri Lanka',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-40">
      {/* Header Area */}
      <div className="pt-40 pb-24 relative overflow-hidden">
        <div className="glow-mesh absolute inset-0 opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-8">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Our Legacy</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              The Future of <br /> <span className="text-gradient">Tech Retail</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
              Since our inception in Deiyandara, SL HUB has been more than just a store. 
              We are a community of creators, gamers, and professionals driven by quality.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-40">
        {/* Story Section */}
        <section className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square rounded-[4rem] overflow-hidden glass border-white/5 group">
             <Image 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
              alt="Our Workspace" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 md:bottom-12 md:left-12 md:right-12 md:p-8 glass rounded-[2rem] md:rounded-[2.5rem] border-white/10">
              <p className="text-white font-black italic text-base md:text-lg leading-snug">
                "We don't just sell computers; we build the tools that empower your dreams."
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Our Story</h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
            </div>
            <div className="space-y-6 text-slate-400 font-medium text-lg leading-relaxed">
              <p>
                SL HUB COMPUTER was established with a clear mission: to bring high-quality, reliable, and affordable technology to the people of Deiyandara and beyond.
              </p>
              <p>
                What started as a specialized venture for Korean branded desktops has evolved into a full-scale tech ecosystem. We now stock everything from the latest flagship smartphones to professional-grade server components.
              </p>
              <p>
                Our philosophy is simple: **Quality without Compromise**. Every unit that enters our inventory undergoes a rigorous 24-point hardware inspection before it reaches your hands.
              </p>
            </div>
            <div className="pt-6">
              <Link href="/products" className="inline-flex h-16 items-center px-10 bg-white text-slate-950 font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all">
                Explore Inventory
              </Link>
            </div>
          </div>
        </section>

        {/* Mission/Vision Cards */}
        <section className="grid md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<Target className="w-8 h-8" />}
            title="Our Mission"
            desc="To democratize high-end technology by making professional-grade hardware accessible to everyone."
          />
          <ValueCard 
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Our Promise"
            desc="Every product comes with a genuine warranty and lifetime technical support from our expert team."
          />
          <ValueCard 
            icon={<Heart className="w-8 h-8" />}
            title="Our Community"
            desc="We aren't just sellers; we are your partners in growth, providing the infrastructure for your success."
          />
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">Ready to upgrade?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
            <Link 
              href="https://wa.me/94710678944" 
              className="h-16 px-8 md:h-20 md:px-12 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-full flex items-center justify-center gap-3 md:gap-4 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all w-full sm:w-auto text-sm md:text-base"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              Chat with an Expert
            </Link>
            <Link 
              href="/contact" 
              className="h-16 px-8 md:h-20 md:px-12 glass border-white/10 text-white font-black uppercase tracking-widest rounded-full flex items-center justify-center hover:bg-white/5 transition-all w-full sm:w-auto text-sm md:text-base"
            >
              Visit Our Store
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-12 glass rounded-[3.5rem] border-white/5 hover:border-primary/50 transition-all duration-500 space-y-8 group">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110">
        {icon}
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-white tracking-tight uppercase group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
