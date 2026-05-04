import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Globe, Phone, MapPin, ShieldAlert, Image as ImageIcon, Share2 } from 'lucide-react';
import { updateSettings } from './actions';
import { AdminMediaUpload } from '@/components/admin/AdminMediaUpload';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .single();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Global Configuration</h1>
        <p className="text-slate-400 font-medium">Manage your brand identity and system-wide parameters.</p>
      </div>

      <form action={updateSettings}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Brand Identity */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" /> Branding & SEO
                </CardTitle>
                <CardDescription className="text-slate-500">Configure how your business appears online.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform Name</Label>
                  <Input 
                    name="site_name" 
                    defaultValue={settings?.site_name || 'SL HUB COMPUTER'} 
                    className="bg-white/5 border-white/10 text-white font-bold h-12" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Store Address</Label>
                  <Textarea 
                    name="address" 
                    defaultValue={settings?.address || 'Deiyandara, Sri Lanka'} 
                    className="bg-white/5 border-white/10 text-white h-20 resize-none" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">About Us Story</Label>
                  <Textarea 
                    name="about_text" 
                    defaultValue={settings?.about_text || ''} 
                    placeholder="Tell your customers about your business history and mission..."
                    className="bg-white/5 border-white/10 text-white h-40 resize-none" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Official Logo</Label>
                  <AdminMediaUpload name="logo" />
                </div>
                
                <div className="pt-6 border-t border-white/10 space-y-6">
                  <h3 className="font-bold text-white">Homepage Hero Configuration</h3>
                  
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Heading</Label>
                    <Input 
                      name="hero_title" 
                      defaultValue={settings?.hero_title || 'The New Experience of Technology'} 
                      className="bg-white/5 border-white/10 text-white font-bold h-12" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sub Heading</Label>
                    <Textarea 
                      name="hero_subtitle" 
                      defaultValue={settings?.hero_subtitle || 'Your trusted partner for high-quality branded computers and professional tech services.'} 
                      className="bg-white/5 border-white/10 text-white h-20 resize-none" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hero Video URL (Optional)</Label>
                    <Input 
                      name="hero_video_url" 
                      defaultValue={settings?.hero_video_url || ''} 
                      placeholder="Direct link to mp4 file"
                      className="bg-white/5 border-white/10 text-blue-400 font-mono text-xs h-10" 
                    />
                    <p className="text-[10px] text-slate-500">If provided, changes the "PC Build Guide" button to a "Watch Video" button.</p>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PC Builder Background Image</Label>
                  <p className="text-xs text-slate-400 mb-2">Upload a high-quality landscape image for the PC Builder section.</p>
                  <Input 
                    type="file" 
                    name="pc_builder_image" 
                    accept="image/*" 
                    className="bg-white/5 border-white/10 text-white" 
                  />
                  {settings?.pc_builder_image && (
                    <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> Custom image is currently active
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-purple-400" /> Social Media & Contact Links
                </CardTitle>
                <CardDescription className="text-slate-500">Manage all your external social media and community links.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Facebook URL</Label>
                  <Input 
                    name="facebook_url" 
                    defaultValue={settings?.facebook_url || ''} 
                    placeholder="https://facebook.com/..."
                    className="bg-white/5 border-white/10 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Instagram URL</Label>
                  <Input 
                    name="instagram_url" 
                    defaultValue={settings?.instagram_url || ''} 
                    placeholder="https://instagram.com/..."
                    className="bg-white/5 border-white/10 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">TikTok URL</Label>
                  <Input 
                    name="tiktok_url" 
                    defaultValue={settings?.tiktok_url || ''} 
                    placeholder="https://tiktok.com/@..."
                    className="bg-white/5 border-white/10 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">YouTube URL</Label>
                  <Input 
                    name="youtube_url" 
                    defaultValue={settings?.youtube_url || ''} 
                    placeholder="https://youtube.com/..."
                    className="bg-white/5 border-white/10 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">X (Twitter) URL</Label>
                  <Input 
                    name="twitter_url" 
                    defaultValue={settings?.twitter_url || ''} 
                    placeholder="https://x.com/..."
                    className="bg-white/5 border-white/10 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Discord Invite URL</Label>
                  <Input 
                    name="discord_url" 
                    defaultValue={settings?.discord_url || ''} 
                    placeholder="https://discord.gg/..."
                    className="bg-white/5 border-white/10 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reddit URL</Label>
                  <Input 
                    name="reddit_url" 
                    defaultValue={settings?.reddit_url || ''} 
                    placeholder="https://reddit.com/r/..."
                    className="bg-white/5 border-white/10 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Twitch URL</Label>
                  <Input 
                    name="twitch_url" 
                    defaultValue={settings?.twitch_url || ''} 
                    placeholder="https://twitch.tv/..."
                    className="bg-white/5 border-white/10 text-white" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-400" /> Support Channels
                </CardTitle>
                <CardDescription className="text-slate-500">Define primary contact methods for customers.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">WhatsApp Business</Label>
                  <Input 
                    name="whatsapp_number" 
                    defaultValue={settings?.whatsapp_number || '+94710678944'} 
                    className="bg-white/5 border-white/10 text-green-400 font-mono" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Direct Hotline</Label>
                  <Input 
                    name="phone_number" 
                    defaultValue={settings?.phone_number || '071 067 8944'} 
                    className="bg-white/5 border-white/10 text-white font-mono" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Business Email</Label>
                  <Input 
                    name="email" 
                    type="email"
                    defaultValue={settings?.email || 'slhub9@gmail.com'} 
                    className="bg-white/5 border-white/10 text-white font-mono" 
                    placeholder="your@email.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Settings */}
          <div className="space-y-8">
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">System Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <Label className="text-white font-bold">Maintenance Mode</Label>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Hide store frontend</p>
                  </div>
                  <Switch name="maintenance_mode" defaultChecked={settings?.maintenance_mode} />
                </div>

                <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 uppercase">
                  <Save className="w-4 h-4 mr-2" /> Commit Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-red-500/5 border-red-500/20 backdrop-blur-md">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-red-500/20 text-red-400 h-fit">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Critical Access</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Changes here affect the entire platform immediately. Be careful when updating contact details or enabling maintenance mode.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
