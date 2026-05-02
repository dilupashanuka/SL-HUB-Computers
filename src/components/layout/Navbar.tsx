"use client"

import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Moon, Sun, Menu, X, MessageCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12">
            <Image 
              src="/logo.png" 
              alt="SL HUB Logo" 
              fill
              sizes="(max-width: 768px) 40px, 48px"
              className="object-contain transition-transform group-hover:scale-105"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tighter leading-none">SL HUB</span>
            <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.2em] text-primary uppercase leading-none">COMPUTER</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 font-medium">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          )}
          
          <Link 
            href="https://wa.me/94710678944" 
            target="_blank"
            className={cn(buttonVariants({ variant: "success", size: "sm" }), "hidden sm:flex gap-2")}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-lg font-medium hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="https://wa.me/94710678944" 
              target="_blank"
              className={cn(buttonVariants({ variant: "success" }), "w-full flex gap-2 h-12 text-lg")}
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
