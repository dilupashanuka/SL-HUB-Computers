import { Metadata } from 'next';
import { Lock, EyeOff } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | SL HUB COMPUTER',
  description: 'Privacy policy for SL HUB COMPUTER. Learn how we handle your personal data, secure your information, and respect your privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-40 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Lock className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Data Protection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Privacy Policy</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Your privacy is important to us. This policy outlines how SL HUB COMPUTER collects, uses, and protects your personal information.
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-8">
            <PrivacySection 
              title="1. Information We Collect"
              content="We collect minimal personal data required for order processing and support, including your name, email address, phone number, and delivery address. We do not store full credit card details on our servers."
            />
            <PrivacySection 
              title="2. Use of Information"
              content="Your data is strictly used for fulfilling orders, providing technical support, and sending important account or warranty updates. We do not sell your personal data to third parties."
            />
            <PrivacySection 
              title="3. Cookies & Tracking"
              content="Our website uses basic cookies to enhance your browsing experience, such as remembering your cart items and login session. You can manage cookie preferences in your browser settings."
            />
            <PrivacySection 
              title="4. Data Security"
              content="We implement industry-standard encryption (SSL/TLS) to protect your data during transmission. Access to your personal data is restricted to authorized employees only."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacySection({ title, content }: { title: string, content: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
      <h3 className="text-xl font-black text-white uppercase tracking-widest">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium">{content}</p>
    </div>
  );
}
