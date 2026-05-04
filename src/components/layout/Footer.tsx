import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  settings?: {
    site_name?: string;
    phone_number?: string;
    address?: string;
    email?: string;
    whatsapp_number?: string;
    facebook_url?: string;
    instagram_url?: string;
    tiktok_url?: string;
    youtube_url?: string;
    logo_url?: string;
  }
}

export function Footer({ settings }: FooterProps) {
  const waNumber = (settings?.whatsapp_number || '94710678944').replace(/[^0-9]/g, '');
  const phone    = settings?.phone_number || '071 067 8944';
  const email    = settings?.email || 'slhub9@gmail.com';
  const address  = settings?.address || 'Deiyandara, Sri Lanka';

  const socials = [
    { label: 'WA',  url: `https://wa.me/${waNumber}`, color: 'hover:bg-green-500' },
    { label: 'FB',  url: settings?.facebook_url,  color: 'hover:bg-blue-600' },
    { label: 'IG',  url: settings?.instagram_url, color: 'hover:bg-pink-600' },
    { label: 'TT',  url: settings?.tiktok_url,    color: 'hover:bg-slate-100 hover:text-black' },
    { label: 'YT',  url: settings?.youtube_url,   color: 'hover:bg-red-600' },
  ].filter(s => s.url);

  return (
    <footer className="bg-slate-950 border-t border-white/5">

      {/* Main grid */}
      <div className="container mx-auto px-4 pt-20 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand column */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">
              {settings?.site_name || 'SL HUB COMPUTER'}
            </h3>
            <div className="w-12 h-1 bg-primary rounded-full mt-3" />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            The New Experience of Technology. Your trusted partner for high-quality branded computers, mobile phones, and tech services.
          </p>

          {/* Social icons */}
          {socials.length > 0 && (
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url!}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 text-[10px] font-black transition-all duration-300 ${s.color} hover:text-white hover:border-transparent hover:scale-110`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Navigate</h4>
          <ul className="space-y-3">
            {[
              { label: 'Home',      href: '/' },
              { label: 'Products',  href: '/products' },
              { label: 'PC Builder',href: '/pc-builder' },
              { label: 'Services',  href: '/services' },
              { label: 'About Us',  href: '/about' },
              { label: 'Contact',   href: '/contact' },
            ].map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all duration-300" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Contact Us</h4>
          <ul className="space-y-4">
            <li>
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer"
                className="group flex items-start gap-3 text-slate-400 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Hotline</p>
                  <p className="text-sm font-bold">{phone}</p>
                </div>
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`}
                className="group flex items-start gap-3 text-slate-400 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Email</p>
                  <p className="text-sm font-bold">{email}</p>
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3 text-slate-400">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Location</p>
                <p className="text-sm font-bold">{address}</p>
              </a>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Opening Hours</h4>
          <ul className="space-y-3 text-sm">
            {[
              { day: 'Monday – Friday', time: '8:30 AM – 6:00 PM' },
              { day: 'Saturday',        time: '9:00 AM – 5:00 PM' },
              { day: 'Sunday',          time: 'Closed' },
            ].map(row => (
              <li key={row.day} className="flex items-center gap-3">
                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                <div className="flex justify-between w-full">
                  <span className="text-slate-400 font-medium">{row.day}</span>
                  <span className={`font-black text-xs ${row.time === 'Closed' ? 'text-red-400' : 'text-white'}`}>{row.time}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={`https://wa.me/${waNumber}?text=Hello! I need assistance.`}
            target="_blank"
            className="group mt-4 flex items-center justify-between w-full px-5 py-3 bg-primary/10 border border-primary/20 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <span className="text-xs font-black uppercase tracking-widest">Chat Now</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Trust & Payment Section */}
      <div className="container mx-auto px-4 py-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-8">
        <div className="flex items-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mr-2">Secure Payments:</div>
          <span className="text-xs font-black text-white border border-white/10 px-2 py-1 rounded">VISA</span>
          <span className="text-xs font-black text-white border border-white/10 px-2 py-1 rounded">MASTER</span>
          <span className="text-xs font-black text-white border border-white/10 px-2 py-1 rounded">KOKO</span>
          <span className="text-xs font-black text-white border border-white/10 px-2 py-1 rounded">BANK TRANSFER</span>
        </div>

        <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          <Link href="/warranty" className="hover:text-primary transition-colors">Warranty Policy</Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs font-medium">
            © {new Date().getFullYear()} {settings?.site_name || 'SL HUB COMPUTER'}. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Designed & Developed by{' '}
            <a href="https://shanukadigital.com" target="_blank" rel="noreferrer"
              className="text-slate-400 hover:text-primary transition-colors font-bold">
              Shanuka Digital Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
