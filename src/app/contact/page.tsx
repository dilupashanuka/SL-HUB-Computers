import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          We'd love to hear from you. Get in touch with us via WhatsApp, phone, or visit our store in Deiyandara.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
        <div className="space-y-8">
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Our Location</h3>
                  <p className="text-muted-foreground">Deiyandara, Sri Lanka</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone Number</h3>
                  <p className="text-muted-foreground">071 067 8944</p>
                  <p className="text-muted-foreground">+94 71 067 8944</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Address</h3>
                  <p className="text-muted-foreground">slhub9@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Business Hours</h3>
                  <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 rounded-2xl shadow-lg">
            <MessageCircle className="w-12 h-12 mb-6 opacity-80 text-white" />
            <h2 className="text-3xl font-bold mb-4 text-white">Fastest Way to Reach Us</h2>
            <p className="text-white/80 mb-8 text-lg">
              Send us a message on WhatsApp. We usually reply within a few minutes during business hours.
            </p>
            <Link 
              href="https://wa.me/94710678944" 
              target="_blank"
              className={cn(buttonVariants({ variant: "success", size: "lg" }), "w-full h-14 text-lg font-semibold rounded-full")}
            >
              Chat on WhatsApp
            </Link>
          </div>
        </div>

        <div className="h-full min-h-[400px] rounded-2xl overflow-hidden border border-border shadow-sm">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15873.344605929424!2d80.58434775!3d6.08523315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1468165d78575%3A0x633e7f4c34a2e55a!2sDeiyandara!5e0!3m2!1sen!2slk!4v1714647300000!5m2!1sen!2slk" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="SL HUB COMPUTER Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
