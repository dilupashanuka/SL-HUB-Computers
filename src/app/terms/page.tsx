import { Metadata } from 'next';
import { Scale, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | SL HUB COMPUTER',
  description: 'Terms and conditions for using SL HUB COMPUTER website and services. Read about our sales policies, user responsibilities, and legal agreements.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-40 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Scale className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Legal Framework</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Terms & Conditions</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              By accessing and using the SL HUB COMPUTER website and services, you agree to comply with the following terms and conditions.
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-8">
            <TermSection 
              title="1. Order & Payments"
              content="All orders placed through the website or in-store are subject to availability. Payments must be made in full before delivery unless a specific credit agreement exists. We accept Bank Transfers, Credit Cards, and selected installments like KOKO."
            />
            <TermSection 
              title="2. Pricing"
              content="While we strive for 100% accuracy, technical errors in pricing may occur. SL HUB reserves the right to cancel orders placed with incorrect pricing due to system glitches."
            />
            <TermSection 
              title="3. Deliveries"
              content="Standard delivery times are between 24-48 hours within Sri Lanka. Any delays due to courier services or external factors are beyond our control, but we will assist in tracking and resolving issues."
            />
            <TermSection 
              title="4. Returns"
              content="Hardware returns are only accepted within 7 days of purchase if the product is in its original, unopened packaging. A restocking fee may apply for opened products that are not defective."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TermSection({ title, content }: { title: string, content: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
      <h3 className="text-xl font-black text-white uppercase tracking-widest">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium">{content}</p>
    </div>
  );
}
