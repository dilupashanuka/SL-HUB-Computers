'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ImageIcon, Video, Sparkles } from 'lucide-react';

export default function HeroManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Hero Showcase', href: '/tarusha/dashboard/hero', icon: ImageIcon },
    { name: 'Hero Videos', href: '/tarusha/dashboard/hero/videos', icon: Video },
    { name: 'Hero Sub Posts', href: '/tarusha/dashboard/hero/sub-posts', icon: Sparkles },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Hero Section Manager</h1>
        <p className="text-slate-400 font-medium">Manage all components of the Home Page Hero section.</p>
      </div>

      <div className="flex gap-2 border-b border-white/10 pb-px">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all font-bold text-sm tracking-widest uppercase ${
                isActive
                  ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                  : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
              } rounded-t-xl`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </Link>
          );
        })}
      </div>

      <div className="pt-4">
        {children}
      </div>
    </div>
  );
}
