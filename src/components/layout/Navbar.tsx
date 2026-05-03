"use client"

import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, MessageCircle, Search, ShoppingCart, User, Cpu, Smartphone, Monitor, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { SearchOverlay } from './SearchOverlay';

const NAV_LINKS = [
  { 
    label: "Inventory", 
    href: "/products",
    submenu: [
      { label: "Workstations", href: "/products?inventory=workstations", icon: Monitor },
      { label: "Flagships", href: "/products?inventory=flagships", icon: Smartphone },
      { label: "Components", href: "/products?inventory=components", icon: Cpu },
    ]
  },
  { label: "Build PC", href: "/pc-builder" },
  { label: "Services", href: "/services" },
  { label: "Our Story", href: "/about" },
];

interface NavbarProps {
  settings?: {
    site_name: string;
    logo_url?: string;
  }
}

export function Navbar({ settings }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for glass effect
      setScrolled(currentScrollY > 20);
      
      // Visible state for hide-on-scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={cn(
      "fixed top-0 left-0 right-0 z-[1000] transition-all duration-500",
      scrolled ? "h-20 glass border-b border-white/5" : "h-24 bg-transparent",
      !visible && !isMenuOpen ? "-translate-y-full" : "translate-y-0"
    )}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 bg-white/5 rounded-2xl p-2 border border-white/10 group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Image 
              src={settings?.logo_url || "/logo.png"} 
              alt={settings?.site_name || "SL HUB Logo"} 
              fill
              sizes="56px"
              className="object-contain transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>
          <div className="flex flex-col flex-shrink-0">
            <span className="text-lg lg:text-xl xl:text-2xl font-black tracking-tighter text-white leading-none group-hover:text-primary transition-colors whitespace-nowrap">
              SL HUB <span className="text-primary">COMPUTER</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 2xl:gap-10">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="relative group/item py-4">
              <Link 
                href={link.href} 
                className="text-[11px] xl:text-[13px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center gap-1"
              >
                {link.label}
                {link.submenu && <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4 transition-transform group-hover/item:rotate-180" />}
              </Link>
              
              {link.submenu && (
                <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 transform translate-y-2 group-hover/item:translate-y-0">
                  <div className="glass rounded-[2rem] p-4 shadow-2xl border border-white/10 overflow-hidden">
                    <div className="grid gap-2">
                      {link.submenu.map((sub) => (
                        <Link 
                          key={sub.label}
                          href={sub.href}
                          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group/sub"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/sub:bg-primary group-hover/sub:text-primary-foreground transition-all">
                            <sub.icon className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-bold uppercase tracking-widest">{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 lg:gap-3 xl:gap-6">
          <button 
            onClick={() => setSearchOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link 
            href="/tarusha" 
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <User className="w-5 h-5" />
          </Link>

          <Link 
            href="https://wa.me/94710678944" 
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default" }), 
              "hidden lg:flex h-10 xl:h-12 px-5 xl:px-8 text-[10px] xl:text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:scale-105 active:scale-95"
            )}
          >
            Support
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-12 h-12 glass rounded-2xl flex items-center justify-center text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      </nav>

      {/* Premium Mobile Menu Overlay - Moved outside nav for highest z-index priority */}
      <div className={cn(
        "fixed inset-0 bg-slate-950 lg:hidden transition-all duration-500 ease-in-out z-[9999] overflow-hidden",
        isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4 pointer-events-none"
      )}>
        {/* Animated background shapes */}
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-purple-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="flex flex-col h-full pt-20 px-6 pb-8 relative z-10 overflow-y-auto custom-scrollbar">
          {/* Menu Header */}
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                 <Image src={settings?.logo_url || "/logo.png"} alt="Logo" width={28} height={28} className="object-contain" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tighter uppercase block leading-none">SL HUB</span>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Navigation</span>
              </div>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="grid gap-4">
            {NAV_LINKS.map((link, i) => (
              <Link 
                key={link.label}
                href={link.href}
                className="group relative flex items-center justify-between p-6 rounded-[2.5rem] bg-white/5 border border-white/5 active:bg-white/10 transition-all overflow-hidden"
                style={{ transitionDelay: `${i * 50}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-active:scale-110 transition-transform">
                      <ChevronRight className="w-6 h-6 text-primary" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-2xl font-black text-white tracking-tighter uppercase leading-none">
                       {link.label}
                     </span>
                     <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Explore Section</span>
                   </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 group-active:text-white transition-colors">
                   <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}

            {/* Account Shortcut */}
            <Link 
              href="/tarusha" 
              className="group relative flex items-center justify-between p-6 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20 active:scale-[0.98] transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                    <User className="w-6 h-6" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-2xl font-black text-white tracking-tighter uppercase leading-none">
                     Account
                   </span>
                   <span className="text-[9px] font-bold text-primary-foreground/50 uppercase tracking-widest mt-1">Admin Portal</span>
                 </div>
              </div>
              <ChevronRight className="w-6 h-6 text-white" />
            </Link>
          </div>

          {/* Support Section */}
          <div className="mt-10 pt-10 border-t border-white/5">
            <div className="space-y-6">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] px-2">Support & Contact</span>
              <div className="grid gap-3">
                 <Link 
                  href="https://wa.me/94710678944" 
                  target="_blank"
                  className="h-20 w-full bg-[#25D366] flex items-center justify-between px-8 text-white font-black uppercase tracking-widest rounded-[2rem] shadow-xl shadow-green-500/20 active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <MessageCircle className="w-6 h-6 fill-current" />
                    <span>WhatsApp Help</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
                
                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Location</span>
                    <span className="text-sm font-bold text-white uppercase tracking-tight">Deiyandara, SL</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</span>
                    <span className="text-sm font-bold text-green-500 uppercase tracking-tight flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                       Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
