import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  MessageSquare, 
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
  Sparkles
} from 'lucide-react';
import { AdminClientLayout } from './AdminClientLayout';

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

  return <AdminClientLayout user={user}>{children}</AdminClientLayout>;
}
