import { MapPin, Phone, Mail, Clock, MessageCircle, Sparkles, Send, Globe } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | SL HUB COMPUTER',
  description: 'Get in touch with SL HUB COMPUTER. Find our store in Deiyandara, or contact us directly via phone or WhatsApp for instant support and technical advice.',
  keywords: 'contact SL HUB, computer shop Deiyandara contact, tech support Sri Lanka',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-40">
      {/* Header Area */}
      <div className="pt-40 pb-24 relative overflow-hidden">
        <div className="glow-mesh absolute inset-0 opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-8">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Get In Touch</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              Expert Help <br /> <span className="text-gradient">Anytime</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
              Have a technical question or looking for a quote? Our team is standing by to help you find the right solution.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Details */}
          <div className="space-y-10">
            <div className="grid sm:grid-cols-2 gap-6">
              <ContactCard 
                icon={<MapPin className="w-6 h-6" />}
                label="Visit Our Hub"
                value="Deiyandara, Sri Lanka"
              />
              <ContactCard 
                icon={<Phone className="w-6 h-6" />}
                label="Direct Line"
                value="071 067 8944"
              />
              <ContactCard 
                icon={<Mail className="w-6 h-6" />}
                label="Official Email"
                value="slhub9@gmail.com"
              />
              <ContactCard 
                icon={<Clock className="w-6 h-6" />}
                label="Business Hours"
                value="Open 24/7 (Mon-Sat)"
              />
            </div>

            {/* Premium WhatsApp CTA */}
            <div className="p-12 md:p-16 rounded-[4rem] bg-gradient-to-br from-green-600 to-green-900 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110" />
              <div className="relative z-10 space-y-8 text-center sm:text-left">
                <MessageCircle className="w-16 h-16 text-white mb-4 mx-auto sm:mx-0" />
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">The Fastest Way to <br /> Reach Our Experts</h2>
                <p className="text-lg text-white/80 font-medium max-w-md">
                  Skip the wait. Chat directly with a technician on WhatsApp for instant pricing and technical advice.
                </p>
                <Link 
                  href="https://wa.me/94710678944" 
                  className="h-16 px-8 md:h-20 md:px-12 bg-white text-green-700 font-black uppercase tracking-widest rounded-full flex items-center justify-center gap-3 md:gap-4 hover:bg-green-50 transition-all text-base md:text-lg shadow-2xl w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                  Chat Now
                </Link>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="space-y-10">
             <div className="aspect-[4/5] lg:aspect-square rounded-[4rem] overflow-hidden glass border-white/10 group shadow-2xl relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15873.344605929424!2d80.58434775!3d6.08523315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1468165d78575%3A0x633e7f4c34a2e55a!2sDeiyandara!5e0!3m2!1sen!2slk!4v1714647300000!5m2!1sen!2slk" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SL HUB COMPUTER Location"
                  className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                ></iframe>
                <div className="absolute top-10 right-10 flex gap-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10">
                    <Globe className="w-5 h-5" />
                  </div>
                </div>
             </div>

             <div className="p-10 glass rounded-[3rem] border-white/5 space-y-6">
                <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-4">
                  <Send className="w-5 h-5 text-primary" />
                  Send a Quick Message
                </h3>
                <div className="grid gap-4">
                  <input type="text" placeholder="Your Name" className="bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50" />
                  <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50" />
                  <textarea placeholder="How can we help?" rows={4} className="bg-white/5 border border-white/5 rounded-3xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 resize-none"></textarea>
                  <button className="h-16 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-2xl hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">Send Message</button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-8 glass rounded-[2.5rem] border-white/5 hover:border-primary/20 transition-all duration-500 group">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </div>
      <div className="space-y-1">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
        <span className="text-sm font-bold text-white uppercase tracking-tight block">{value}</span>
      </div>
    </div>
  );
}
