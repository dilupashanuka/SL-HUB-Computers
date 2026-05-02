import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
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
  FileText 
} from 'lucide-react';
import { logout } from '../actions';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/tarusha');
  }

  const navItems = [
    { label: 'DASHBOARD', href: '/tarusha/dashboard', icon: LayoutDashboard },
    { label: 'HERO SHOWCASE', href: '/tarusha/dashboard/hero', icon: ImageIcon },
    { label: 'INVENTORY', href: '/tarusha/dashboard/products', icon: Package },
    { label: 'CATEGORIES', href: '/tarusha/dashboard/categories', icon: Grid },
    { label: 'SOCIAL FEED', href: '/tarusha/dashboard/social-feed', icon: Share2 },
    { label: 'REVIEWS', href: '/tarusha/dashboard/reviews', icon: Star },
    { label: 'MESSAGES', href: '/tarusha/dashboard/messages', icon: Mail },
    { label: 'FAQ MANAGER', href: '/tarusha/dashboard/faq', icon: HelpCircle },
    { label: 'SITE CONTENT', href: '/tarusha/dashboard/content', icon: FileText },
    { label: 'SITE CONFIG', href: '/tarusha/dashboard/config', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#050811] text-slate-200 selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-68 bg-slate-950/50 backdrop-blur-xl border-r border-white/5 hidden md:flex flex-col sticky top-0 h-screen z-20">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">SL HUB <span className="text-blue-400">PRO</span></h2>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold ml-11">Admin Terminal</p>
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

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="group flex items-center gap-3 px-4 py-3 text-[13px] font-bold rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all duration-200"
            >
              <item.icon className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              <span className="tracking-wide">{item.label}</span>
            </Link>
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

        <header className="h-20 border-b border-white/5 flex items-center px-10 sticky top-0 bg-[#050811]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="hover:text-blue-400 transition-colors cursor-pointer uppercase tracking-widest">Admin</span>
            <span className="text-slate-700">/</span>
            <span className="text-slate-300 uppercase tracking-widest">Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-400 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              System Online
            </div>
          </div>
        </header>

        <div className="flex-1 p-10">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
