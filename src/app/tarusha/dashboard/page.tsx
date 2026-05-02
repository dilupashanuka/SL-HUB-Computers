import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  ExternalLink,
  Clock,
  Layout,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch Stats
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: messageCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });
  const { count: unreadMessages } = await supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false);
  const { count: reviewCount } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
  
  // Fetch Recent Activity
  const { data: recentProducts } = await supabase.from('products').select('*').order('created_at', { ascending: false }).limit(3);
  const { data: recentMessages } = await supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(3);

  const stats = [
    {
      title: "Active Inventory",
      value: productCount || 0,
      icon: Package,
      trend: "+12% from last month",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      link: "/tarusha/dashboard/products"
    },
    {
      title: "Client Inquiries",
      value: messageCount || 0,
      icon: MessageSquare,
      trend: unreadMessages ? `${unreadMessages} unread messages` : "No pending messages",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      link: "/tarusha/dashboard/messages"
    },
    {
      title: "Customer Reviews",
      value: reviewCount || 0,
      icon: Star,
      trend: "4.8 Average Rating",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      link: "/tarusha/dashboard/reviews"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">System Overview</h1>
          <p className="text-slate-400 font-medium tracking-tight">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/tarusha/dashboard/products/new">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-600/20">
              <Plus className="w-4 h-4 mr-2" /> New Product
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="outline" className="border-white/10 text-white h-11 px-6 rounded-xl bg-white/5 hover:bg-white/10">
              <ExternalLink className="w-4 h-4 mr-2" /> Live Site
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.link}>
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md hover:bg-white/5 transition-all duration-300 group cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    Live
                  </div>
                </div>
                <div className="mt-6 space-y-1">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.title}</p>
                  <h3 className="text-4xl font-black text-white tabular-nums">{stat.value}</h3>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.trend}</p>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Activity Sections */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" /> Recent System Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {recentProducts?.map((product) => (
                <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">New Product Added</p>
                    <p className="text-xs text-slate-500 truncate">{product.title}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">
                    {new Date(product.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
              {recentMessages?.map((msg) => (
                <div key={msg.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">New Message Received</p>
                    <p className="text-xs text-slate-500 truncate">From {msg.name}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Layout className="w-5 h-5 text-orange-400" /> Maintenance Control
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/tarusha/dashboard/hero">
                <Button variant="outline" className="w-full h-24 flex-col gap-2 border-white/5 bg-white/5 hover:bg-blue-600/10 hover:border-blue-500/30 text-slate-400 hover:text-blue-400 transition-all rounded-2xl">
                  <Layout className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Update Hero</span>
                </Button>
              </Link>
              <Link href="/tarusha/dashboard/content">
                <Button variant="outline" className="w-full h-24 flex-col gap-2 border-white/5 bg-white/5 hover:bg-emerald-600/10 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 transition-all rounded-2xl">
                  <FileText className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Edit Policies</span>
                </Button>
              </Link>
              <Link href="/tarusha/dashboard/categories">
                <Button variant="outline" className="w-full h-24 flex-col gap-2 border-white/5 bg-white/5 hover:bg-purple-600/10 hover:border-purple-500/30 text-slate-400 hover:text-purple-400 transition-all rounded-2xl">
                  <Plus className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Add Category</span>
                </Button>
              </Link>
              <Link href="/tarusha/dashboard/social-feed">
                <Button variant="outline" className="w-full h-24 flex-col gap-2 border-white/5 bg-white/5 hover:bg-orange-600/10 hover:border-orange-500/30 text-slate-400 hover:text-orange-400 transition-all rounded-2xl">
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Sync Social</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FileText(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}
