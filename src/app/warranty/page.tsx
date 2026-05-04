import { Metadata } from 'next';
import { ShieldCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Warranty Policy | SL HUB COMPUTER',
  description: 'Detailed warranty policy for SL HUB COMPUTER. Learn about our coverage for custom PC builds, components, and after-sales support.',
};

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-40 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <ShieldCheck className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Protection Plan</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Warranty Policy</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              At SL HUB COMPUTER, we stand behind the quality of our products and services. Our comprehensive warranty ensures you have peace of mind with every purchase.
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-8">
            <PolicySection 
              title="1. Custom PC Builds"
              content="All our custom-built workstations come with a standard 3-year hardware warranty. This covers manufacturing defects and failures under normal usage conditions. Labor for hardware replacement within the first year is completely free of charge."
            />
            <PolicySection 
              title="2. Individual Components"
              content="Individual hardware components (GPUs, CPUs, Motherboards, etc.) are covered by their respective manufacturer warranties. SL HUB will facilitate the RMA process for components purchased through us."
            />
            <PolicySection 
              title="3. Mobile Devices"
              content="Brand new flagship mobile devices come with a 1-year company warranty. Used or refurbished devices are sold with a specific limited shop warranty as stated at the time of purchase."
            />
            <PolicySection 
              title="4. Software & Services"
              content="Software issues, including OS corruption, virus infections, or third-party software errors, are not covered under hardware warranty. However, we provide discounted service rates for our existing customers."
            />
          </div>

          {/* Warranty Verification Info */}
          <div className="p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 glass backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-4 text-primary">
              <AlertCircle className="w-8 h-8" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Important Note</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              The warranty is void if the "Warranty Seal" is broken, or if the device shows signs of physical damage, liquid ingress, or unauthorized repairs. Always keep your original invoice for warranty claims.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicySection({ title, content }: { title: string, content: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
      <h3 className="text-xl font-black text-white uppercase tracking-widest">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium">{content}</p>
    </div>
  );
}
