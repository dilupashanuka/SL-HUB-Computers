import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export async function Footer() {
  const supabase = await createClient();
  const { data: configData } = await supabase.from('site_config').select('*');
  
  const config: Record<string, string> = {};
  configData?.forEach(item => {
    config[item.key] = item.value;
  });

  const socialLinks = [
    { 
      key: 'facebook_url',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    { 
      key: 'tiktok_url',
      icon: <span className="text-[10px] font-bold tracking-tighter">TikTok</span>
    },
    { 
      key: 'instagram_url',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
        </svg>
      )
    },
    { 
      key: 'youtube_url',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path>
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">SL HUB COMPUTER</h3>
          <p className="text-sm mb-4">The New Experience of Technology. Your trusted partner for high-quality branded and used computers, mobile phones, and accessories.</p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>Deiyandara, Sri Lanka</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>{config.phone || '071 067 8944 / +94 71 067 8944'}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>{config.email || 'slhub9@gmail.com'}</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-3 flex-wrap">
            {socialLinks.map((social) => {
              const url = config[social.key];
              if (!url) return null;
              
              return (
                <a 
                  key={social.key}
                  href={url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                >
                  {social.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} SL HUB COMPUTER. All rights reserved.</p>
        <p className="mt-2 text-slate-500">
          Designed & Developed by <a href="https://shanukadigital.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors font-medium">Shanuka Digital Solutions</a>
        </p>
      </div>
    </footer>
  );
}
