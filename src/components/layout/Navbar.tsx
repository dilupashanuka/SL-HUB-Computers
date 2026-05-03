"use client"

import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, MessageCircle, Search, ShoppingCart, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/services", label: "Build PC" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Support" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "h-16 glass mt-0 border-b border-white/10" : "h-20 bg-transparent mt-2"
    )}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 bg-white/5 rounded-xl p-1.5 border border-white/10 group-hover:border-primary/50 transition-colors">
            <Image 
              src="/logo.png" 
              alt="SL HUB Logo" 
              fill
              className="object-contain transition-transform group-hover:scale-110"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none">SL HUB</span>
            <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase leading-none">COMPUTER</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-sm font-bold text-slate-300 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-300 hover:text-white hover:bg-white/5 rounded-full">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link 
            href="/tarusha" 
            className="hidden sm:flex p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>

          <Link 
            href="https://wa.me/94710678944" 
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default" }), 
              "hidden md:flex gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            )}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-0 top-[64px] bg-background/95 backdrop-blur-2xl md:hidden transition-all duration-300 ease-in-out z-40",
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="p-6 space-y-6">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-2xl font-black text-white hover:text-primary transition-colors py-4 border-b border-white/5 flex justify-between items-center group"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                <span className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
          
          <div className="pt-6 grid grid-cols-2 gap-4">
            <Link 
              href="https://wa.me/94710678944" 
              className={cn(buttonVariants({ variant: "default" }), "w-full h-14 bg-primary font-bold text-lg rounded-2xl")}
              onClick={() => setIsMenuOpen(false)}
            >
              WhatsApp
            </Link>
            <Link 
              href="/tarusha" 
              className={cn(buttonVariants({ variant: "outline" }), "w-full h-14 border-white/10 text-white font-bold text-lg rounded-2xl")}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
