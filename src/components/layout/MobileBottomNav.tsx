"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Wrench, Info, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOBILE_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Shop", icon: ShoppingBag },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/contact", label: "Contact", icon: MessageSquare },
  { href: "/tarusha", label: "Admin", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="glass rounded-full px-6 py-3 border border-white/10 shadow-2xl flex items-center justify-between">
        {MOBILE_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className="flex flex-col items-center gap-1 group"
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "text-slate-400 group-hover:text-white"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              {/* <span className={cn(
                "text-[8px] font-black uppercase tracking-tighter transition-all",
                isActive ? "text-primary opacity-100" : "text-slate-500 opacity-0"
              )}>
                {link.label}
              </span> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
