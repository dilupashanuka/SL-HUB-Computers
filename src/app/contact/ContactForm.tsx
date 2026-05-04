'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { submitContactMessage } from './actions';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitContactMessage(formData);
    
    setIsSubmitting(false);
    
    if (result.success) {
      toast.success('Message sent successfully! We will get back to you soon.');
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || 'Failed to send message.');
    }
  };

  return (
    <div className="p-8 md:p-12 rounded-[3rem] bg-slate-900/40 border border-white/5 glass backdrop-blur-xl relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full" />
      
      <div className="relative z-10">
        <div className="mb-8">
          <h3 className="text-3xl font-black text-white tracking-tight mb-2">Send us a Message</h3>
          <p className="text-slate-400 font-medium">Fill out the form below and our team will get back to you within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Your Name</label>
              <Input 
                name="name" 
                placeholder="John Doe" 
                required 
                className="bg-slate-950/50 border-white/10 text-white h-12 focus:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <Input 
                name="email" 
                type="email" 
                placeholder="john@example.com" 
                required 
                className="bg-slate-950/50 border-white/10 text-white h-12 focus:border-primary/50"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subject</label>
            <Input 
              name="subject" 
              placeholder="How can we help?" 
              className="bg-slate-950/50 border-white/10 text-white h-12 focus:border-primary/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Message</label>
            <Textarea 
              name="message" 
              placeholder="Tell us about your inquiry..." 
              required 
              className="bg-slate-950/50 border-white/10 text-white min-h-[150px] resize-none focus:border-primary/50"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest rounded-2xl transition-all"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Send className="w-5 h-5 mr-2" />
            )}
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  );
}
