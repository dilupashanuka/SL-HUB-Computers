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
    twitter_url?: string;
    discord_url?: string;
    reddit_url?: string;
    twitch_url?: string;
    logo_url?: string;
  }
}

export function Footer({ settings }: FooterProps) {
  const waNumber = (settings?.whatsapp_number || '94710678944').replace(/[^0-9]/g, '');
  const phone    = settings?.phone_number || '071 067 8944';
  const email    = settings?.email || 'slhub9@gmail.com';
  const address  = settings?.address || 'Deiyandara, Sri Lanka';

  const socials = [
    { 
      id: 'facebook', 
      url: settings?.facebook_url, 
      color: 'hover:bg-[#1877F2]', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> 
    },
    { 
      id: 'instagram', 
      url: settings?.instagram_url, 
      color: 'hover:bg-[#E4405F]', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> 
    },
    { 
      id: 'tiktok', 
      url: settings?.tiktok_url, 
      color: 'hover:bg-[#000000]', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.591.214 3.75.606V7.06c-1.027-.64-2.234-1.011-3.525-1.011-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25c1.291 0 2.498-.371 3.525-1.011v4.707c-1.159.392-2.44.606-3.75.606-6.627 0-12-5.373-12-12s5.373-12 12-12zm9.825 8.286v5.714c-2.14 0-3.886 1.747-3.886 3.887V24h-5.714v-9.563c0-2.139 1.746-3.886 3.886-3.886h5.714z"/></svg> 
    },
    { 
      id: 'youtube', 
      url: settings?.youtube_url, 
      color: 'hover:bg-[#FF0000]', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> 
    },
    { 
      id: 'twitter', 
      url: settings?.twitter_url, 
      color: 'hover:bg-[#000000]', 
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/></svg> 
    },
    { 
      id: 'discord', 
      url: settings?.discord_url, 
      color: 'hover:bg-[#5865F2]', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.297 1.197-1.99a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.29a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .077.01c.12.098.246.196.373.29a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.874.89.076.076 0 0 0-.041.107c.345.693.745 1.36 1.197 1.99a.078.078 0 0 0 .084.028 19.83 19.83 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg> 
    },
    { 
      id: 'twitch', 
      url: settings?.twitch_url, 
      color: 'hover:bg-[#9146FF]', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg> 
    },
    { 
      id: 'reddit', 
      url: settings?.reddit_url, 
      color: 'hover:bg-[#FF4500]', 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.057 1.597.047.253.075.512.075.77 0 2.461-2.851 4.453-6.363 4.453-3.511 0-6.363-1.992-6.363-4.453 0-.258.028-.517.075-.77a1.751 1.751 0 0 1-1.057-1.597c0-.968.786-1.754 1.754-1.754.463 0 .875.18 1.183.475 1.187-.822 2.774-1.354 4.523-1.458l.886-4.155c.01-.042.053-.07.098-.063l2.732.574c.196-.284.525-.473.896-.473zM10.5 12c-.66 0-1.2.54-1.2 1.2s.54 1.2 1.2 1.2 1.2-.54 1.2-1.2-.54-1.2-1.2-1.2zm3 0c-.66 0-1.2.54-1.2 1.2s.54 1.2 1.2 1.2 1.2-.54 1.2-1.2-.54-1.2-1.2-1.2zm-3.75 4.5a.75.75 0 0 1 0 1.5c-1.5 0-2.25-1.5-2.25-1.5a.75.75 0 1 1 1.286-.773s.344.773.964.773z"/></svg> 
    },
  ].filter(s => s.url);

  return (
    <footer className="bg-slate-950 border-t border-white/5">

      {/* Main grid */}
      <div className="container mx-auto px-4 pt-20 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

        {/* Brand column */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">
              {settings?.site_name || 'SL HUB COMPUTER'}
            </h3>
            <div className="w-12 h-1 bg-primary rounded-full mt-3" />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            The New Experience of Technology. Your trusted partner for high-quality branded computers, mobile phones, and tech services.
          </p>

          {/* Contact Icons Section */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Connect</h4>
            <div className="grid grid-cols-4 gap-3 max-w-[200px]">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url!}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 transition-all duration-300 ${s.color} hover:text-white hover:border-transparent hover:scale-110 shadow-lg`}
                  title={s.id}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Shop Segments</h4>
          <ul className="space-y-3">
            {[
              { label: 'Flagships',     href: '/products?inventory=flagships' },
              { label: 'Workstations',  href: '/products?inventory=workstations' },
              { label: 'Components',    href: '/products?inventory=components' },
              { label: 'PC Builder',    href: '/pc-builder' },
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

        {/* Explore Links */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Explore</h4>
          <ul className="space-y-3">
            {[
              { label: 'All Products', href: '/products' },
              { label: 'Our Services', href: '/services' },
              { label: 'About Us',     href: '/about' },
              { label: 'Contact',      href: '/contact' },
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
