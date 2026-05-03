import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, PenTool as Tool, ShieldCheck, Truck, Headphones, Zap, Shield, Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/home/Hero";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 3600; // Cache for 1 hour

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch dynamic hero slides
  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .order('created_at', { ascending: false });

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .limit(4)
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Hero slides={slides || []} />

      {/* Trust Signals Bar */}
      <div className="relative z-20 -mt-12 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 glass rounded-3xl border border-white/5 shadow-2xl">
          <TrustItem icon={<Zap className="w-6 h-6" />} title="Fast Delivery" subtitle="Islandwide" />
          <TrustItem icon={<Shield className="w-6 h-6" />} title="Secure Warranty" subtitle="Genuine Items" />
          <TrustItem icon={<Headphones className="w-6 h-6" />} title="Expert Support" subtitle="Technical Help" />
          <TrustItem icon={<Heart className="w-6 h-6" />} title="Best Prices" subtitle="Guaranteed" />
        </div>
      </div>

      {/* Popular Categories */}
      <section className="py-32 relative overflow-hidden">
        <div className="glow-mesh absolute inset-0 opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Categories</span>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">Shop by Category</h2>
            </div>
            <Link href="/products" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              View All Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategoryCard 
              title="Branded Desktops" 
              desc="High-performance Korean branded & used PCs"
              image="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2066&auto=format&fit=crop"
              href="/products?category=desktops"
              accent="blue"
            />
            <CategoryCard 
              title="Flagship Phones" 
              desc="Latest iPhones & Android flagship devices"
              image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop"
              href="/products?category=phones"
              accent="purple"
            />
            <CategoryCard 
              title="Gaming Gear" 
              desc="Premium keyboards, mice, and headsets"
              image="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
              href="/products?category=accessories"
              accent="emerald"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Mini Grid */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
              <span className="w-12 h-1 bg-primary rounded-full" />
              Recent Arrivals
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="h-[450px]">
                  {/* Simplified Card for Home */}
                  <Link href={`/products?id=${product.id}`} className="group relative h-full flex flex-col glass rounded-3xl overflow-hidden border-white/5 hover:border-primary/50 transition-all duration-500">
                    <div className="flex-1 relative">
                      <Image src={product.image_url} alt={product.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white line-clamp-1">{product.title}</h3>
                      <p className="text-primary font-black mt-2">Rs. {product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[3rem] bg-blue-600 p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Build Your Dream <br /> PC with Our Experts
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              From high-end gaming rigs to professional workstations, we help you pick the best parts for your budget.
            </p>
            <Link 
              href="https://wa.me/94710678944" 
              target="_blank"
              className={cn(buttonVariants({ size: "lg" }), "h-16 px-12 bg-white text-blue-600 hover:bg-blue-50 font-black rounded-full text-lg shadow-xl")}
            >
              Consult an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustItem({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm tracking-tight">{title}</span>
        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{subtitle}</span>
      </div>
    </div>
  );
}

function CategoryCard({ title, desc, image, href, accent }: { title: string, desc: string, image: string, href: string, accent: string }) {
  return (
    <Link href={href} className="group relative h-[500px] rounded-[2.5rem] overflow-hidden glass border-white/5 hover:border-primary/50 transition-all duration-500 shadow-2xl">
      <Image src={image} alt={title} fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-10 space-y-4">
        <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-400 font-medium text-lg leading-snug">{desc}</p>
        <div className="pt-2">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </Link>
  )
}
