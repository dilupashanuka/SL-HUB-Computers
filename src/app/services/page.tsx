import { createClient } from '@/utils/supabase/server';
import { Settings, Smartphone, PenTool as Tool, Truck, Headphones, Monitor, Cpu, ShieldAlert, Sparkles, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | SL HUB COMPUTER',
  description: 'Professional tech services in Deiyandara including CCTV installation, hardware repairs, custom PC building, and network infrastructure setup.',
  keywords: 'computer repair, CCTV Sri Lanka, PC building, IT support, Deiyandara',
};

export const revalidate = 0;

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: true });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'settings': return <Settings className="w-8 h-8" />;
      case 'smartphone': return <Smartphone className="w-8 h-8" />;
      case 'tool': return <Tool className="w-8 h-8" />;
      case 'truck': return <Truck className="w-8 h-8" />;
      case 'headphones': return <Headphones className="w-8 h-8" />;
      case 'monitor': return <Monitor className="w-8 h-8" />;
      default: return <Cpu className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-40">
      {/* Header Area */}
      <div className="pt-40 pb-24 relative overflow-hidden">
        <div className="glow-mesh absolute inset-0 opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-8">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Technical Expertise</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              Beyond Just <br /> <span className="text-gradient">Products</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
              We provide professional engineering support for all your tech needs. 
              From expert PC building to advanced software troubleshooting.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <div key={service.id} className="group p-10 glass rounded-[3rem] border border-white/5 hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  {getIcon(service.icon || 'settings')}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  {service.price_range && (
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                      Starting {service.price_range}
                    </span>
                  )}
                </div>

                <p className="text-slate-400 font-medium leading-relaxed line-clamp-4">
                  {service.description}
                </p>

                <div className="pt-4">
                  <Link 
                    href={`https://wa.me/94710678944?text=I'm interested in the ${service.title} service.`}
                    target="_blank"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
                  >
                    Inquire Service
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-40 relative p-12 md:p-24 rounded-[4rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6">
              <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">Need a Custom Technical Solution?</h2>
              <p className="text-lg text-white/80 font-medium">
                Our engineering team is ready to assist you with everything from CCTV systems to large-scale network infrastructure.
              </p>
            </div>
            <Link 
              href="https://wa.me/94710678944" 
              className="h-16 px-8 md:h-20 md:px-12 bg-white text-blue-600 font-black uppercase tracking-[0.2em] rounded-full text-base md:text-lg shadow-2xl flex items-center gap-3 hover:bg-blue-50 transition-all justify-center w-full md:w-auto"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              Chat with Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
