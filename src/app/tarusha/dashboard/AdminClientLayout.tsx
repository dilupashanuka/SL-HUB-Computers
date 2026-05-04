"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  MessageSquare, 
  LogOut, 
  Image as ImageIcon, 
  Grid, 
  Share2, 
  Star, 
  Mail, 
  HelpCircle, 
  FileText,
  Play,
  Video,
  Trophy,
  Sparkles,
  Menu,
  X,
  Cpu,
  User as UserIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '../actions';

interface AdminClientLayoutProps {
  user: any;
  children: React.ReactNode;
}

export function AdminClientLayout({ user, children }: AdminClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navGroups = [
    {
      label: 'Main',
      items: [
        { label: 'DASHBOARD', href: '/tarusha/dashboard', icon: LayoutDashboard },
      ]
    },
    {
      label: 'WEBSITE MANAGEMENT',
      items: [
        { label: 'HERO SHOWCASE', href: '/tarusha/dashboard/hero', icon: ImageIcon },
        { label: 'HERO VIDEOS', href: '/tarusha/dashboard/hero-videos', icon: Video },
        { label: 'HERO SUB POSTS', href: '/tarusha/dashboard/hero-sub-posts', icon: Sparkles },
        { label: 'PC BUILDER', href: '/tarusha/dashboard/pc-builder', icon: Cpu },
        { label: 'TECH REELS', href: '/tarusha/dashboard/reels', icon: Play },
        { label: 'FAQ MANAGER', href: '/tarusha/dashboard/faq', icon: HelpCircle },
        { label: 'SITE CONTENT', href: '/tarusha/dashboard/content', icon: FileText },
        { label: 'SITE CONFIG', href: '/tarusha/dashboard/settings', icon: Settings },
      ]
    },
    {
      label: 'INVENTORY & STORE',
      items: [
        { label: 'PRODUCTS', href: '/tarusha/dashboard/products', icon: Package },
        { label: 'ACCESSORIES', href: '/tarusha/dashboard/products?category=accessories', icon: Package },
        { label: 'CATEGORIES', href: '/tarusha/dashboard/categories', icon: Grid },
        { label: 'PARTNERS', href: '/tarusha/dashboard/partners', icon: Trophy },
      ]
    },
    {
      label: 'COMMUNITY & INTERACTION',
      items: [
        { label: 'SOCIAL FEED', href: '/tarusha/dashboard/social-feed', icon: Share2 },
        { label: 'REVIEWS', href: '/tarusha/dashboard/reviews', icon: Star },
        { label: 'MESSAGES', href: '/tarusha/dashboard/messages', icon: Mail },
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#050811] text-slate-200 selection:bg-blue-500/30">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] md:hidden transition-all duration-300",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={cn(
        "bg-slate-950/50 backdrop-blur-xl border-r border-white/5 flex flex-col fixed md:sticky top-0 h-screen transition-all duration-300 z-[101]",
        "w-72 md:flex",
        isSidebarOpen ? "left-0" : "-left-full md:left-0"
      )}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">SL HUB <span className="text-blue-400">PRO</span></h2>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold ml-11">Admin Terminal</p>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
             <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-blue-400">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.email?.split('@')[0]}</p>
              <p className="text-[10px] text-slate-500 truncate">System Administrator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6 custom-scrollbar">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-2">
              <h3 className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{group.label}</h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="group flex items-center gap-3 px-4 py-2.5 text-[12px] font-bold rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all duration-200"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                    <span className="tracking-wide uppercase">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 bg-slate-950/30">
          <form action={logout}>
            <Button variant="ghost" className="w-full flex items-center justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 font-bold rounded-xl h-11" type="submit">
              <LogOut className="w-4 h-4" />
              SIGN OUT
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col min-h-screen overflow-x-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -ml-64 -mb-64" />

        <header className="h-20 border-b border-white/5 flex items-center px-6 md:px-10 sticky top-0 bg-[#050811]/80 backdrop-blur-md z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mr-4 text-white" 
            onClick={() => setIsSidebarOpen(true)}
          >
             <Menu className="w-6 h-6" />
          </Button>

          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-500">
            <span className="hover:text-blue-400 transition-colors cursor-pointer uppercase tracking-widest">Admin</span>
            <span className="text-slate-700">/</span>
            <span className="text-slate-300 uppercase tracking-widest truncate max-w-[100px] md:max-w-none">Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[8px] md:text-[10px] font-bold text-green-400 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="hidden sm:inline">System</span> Online
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-10">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
