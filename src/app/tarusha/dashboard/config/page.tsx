import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSiteConfig, updateSiteConfig, updatePassword } from './actions';
import { Phone, Share2, Mail, ShieldCheck } from 'lucide-react';

export default async function SiteConfigPage() {
  const config = await getSiteConfig();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Site Configuration</h1>
        <p className="text-slate-400 font-medium">Manage global settings, social links, and system security.</p>
      </div>

      <form action={updateSiteConfig}>
        <div className="grid gap-8">
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="border-b border-white/5 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">Social Media Links</CardTitle>
                  <CardDescription className="text-slate-500">
                    Links will appear in the footer and floating action buttons.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="facebook_url" className="text-slate-300 flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    Facebook URL
                  </Label>
                  <Input 
                    id="facebook_url" 
                    name="facebook_url" 
                    defaultValue={config.facebook_url || ''} 
                    className="bg-white/5 border-white/10 text-white h-11 focus:border-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok_url" className="text-slate-300 flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider">
                    <span className="text-white font-black text-[9px] border border-white/20 px-1 rounded">TT</span>
                    TikTok URL
                  </Label>
                  <Input 
                    id="tiktok_url" 
                    name="tiktok_url" 
                    defaultValue={config.tiktok_url || ''} 
                    className="bg-white/5 border-white/10 text-white h-11 focus:border-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram_url" className="text-slate-300 flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                    Instagram URL
                  </Label>
                  <Input 
                    id="instagram_url" 
                    name="instagram_url" 
                    defaultValue={config.instagram_url || ''} 
                    className="bg-white/5 border-white/10 text-white h-11 focus:border-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube_url" className="text-slate-300 flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
                    YouTube URL
                  </Label>
                  <Input 
                    id="youtube_url" 
                    name="youtube_url" 
                    defaultValue={config.youtube_url || ''} 
                    className="bg-white/5 border-white/10 text-white h-11 focus:border-blue-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="whatsapp_number" className="text-slate-300 flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider">
                  <Phone className="w-3.5 h-3.5 text-green-500" /> WhatsApp Number
                </Label>
                <Input 
                  id="whatsapp_number" 
                  name="whatsapp_number" 
                  defaultValue={config.whatsapp_number || ''} 
                  placeholder="9471XXXXXXX"
                  className="bg-white/5 border-white/10 text-white h-11 focus:border-blue-500/50 transition-all"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md relative overflow-hidden group">
            <CardHeader className="border-b border-white/5 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">Contact Information</CardTitle>
                  <CardDescription className="text-slate-500">
                    Update the contact details shown in the footer and contact page.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Phone Display</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    defaultValue={config.phone || ''} 
                    className="bg-white/5 border-white/10 text-white h-11 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Email Display</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    defaultValue={config.email || ''} 
                    className="bg-white/5 border-white/10 text-white h-11 transition-all"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg" className="px-12 h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95">
              SAVE ALL CHANGES
            </Button>
          </div>
        </div>
      </form>

      <div className="py-6">
        <div className="h-px bg-white/5 w-full" />
      </div>

      <Card className="bg-slate-900/40 border-red-500/20 backdrop-blur-md overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl -mr-16 -mt-16" />
        <CardHeader className="border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-white text-xl">Security & Credentials</CardTitle>
              <CardDescription className="text-slate-500">
                Authorized access only. Updating password will sign you out.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <form action={updatePassword} className="space-y-6 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="password_new" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">New Password</Label>
              <Input id="password_new" name="password" type="password" required className="bg-white/5 border-white/10 text-white h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password" className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Confirm New Password</Label>
              <Input id="confirm_password" name="confirm_password" type="password" required className="bg-white/5 border-white/10 text-white h-11" />
            </div>
            <Button type="submit" variant="destructive" className="h-12 px-8 rounded-xl font-black tracking-widest">
              UPDATE SECURITY TOKEN
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
