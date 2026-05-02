import { createClient } from '@/utils/supabase/server';
import { Settings, Smartphone, PenTool as Tool, Truck, Headphones, Monitor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const revalidate = 0;

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: true });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'settings': return <Settings className="w-8 h-8 text-primary" />;
      case 'smartphone': return <Smartphone className="w-8 h-8 text-primary" />;
      case 'tool': return <Tool className="w-8 h-8 text-primary" />;
      case 'truck': return <Truck className="w-8 h-8 text-primary" />;
      case 'headphones': return <Headphones className="w-8 h-8 text-primary" />;
      case 'monitor': return <Monitor className="w-8 h-8 text-primary" />;
      default: return <Settings className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Professional Tech Services</h1>
        <p className="text-lg text-muted-foreground">
          At SL HUB COMPUTER, we don't just sell products. We provide comprehensive technical services to ensure your devices perform at their best.
        </p>
      </div>

      {!services || services.length === 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Fallback Static Services if DB is empty */}
          <ServiceCard 
            icon={<Monitor className="w-8 h-8 text-primary" />}
            title="Computer Sales & Setup"
            desc="We provide expert advice and setup for new and used branded computers tailored to your needs."
          />
          <ServiceCard 
            icon={<Settings className="w-8 h-8 text-primary" />}
            title="Setup Upgrades"
            desc="Boost your computer's speed and efficiency with RAM, SSD, and graphic card upgrades."
          />
          <ServiceCard 
            icon={<Smartphone className="w-8 h-8 text-primary" />}
            title="Phone Unlocking"
            desc="Professional software troubleshooting, unlocking, and flashing for iOS and Android devices."
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.id} className="border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  {getIcon(service.icon || 'settings')}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                {service.price_range && (
                  <CardDescription className="font-medium text-foreground/80">
                    {service.price_range}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="bg-muted/50 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-border">
        <h2 className="text-3xl font-bold mb-4">Need a custom service?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Contact our technical team directly to discuss your specific requirements. We are always ready to help.
        </p>
        <Link 
          href="/contact"
          className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10")}
        >
          Contact Us Now
        </Link>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all">
      <CardHeader>
        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {desc}
        </p>
      </CardContent>
    </Card>
  )
}
