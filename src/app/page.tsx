import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, PenTool as Tool, ShieldCheck, Truck, Headphones } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-medium mb-4">
              Welcome to SL HUB COMPUTER
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              The New Experience of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Technology</span>
            </h1>
            <p className="text-xl text-slate-300 md:text-2xl leading-relaxed max-w-2xl">
              Your trusted partner for high-quality branded computers, smartphones, and professional tech services in Deiyandara.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/products"
                className={cn(buttonVariants({ size: "lg" }), "bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-950 transition-all font-bold px-10 rounded-full")}
              >
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/services"
                className={cn(buttonVariants({ size: "lg" }), "bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-950 transition-all font-bold px-10 rounded-full")}
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Browse our wide selection of tech products.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategoryCard 
              title="Desktop Computers" 
              desc="High-performance Korean branded & used PCs"
              icon={<Monitor className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400" />}
              href="/products?category=desktops"
            />
            <CategoryCard 
              title="Smartphones" 
              desc="Latest iPhones & Android devices"
              icon={<Smartphone className="w-10 h-10 mb-4 text-purple-600 dark:text-purple-400" />}
              href="/products?category=phones"
            />
            <CategoryCard 
              title="Accessories" 
              desc="Keyboards, mice, headsets and more"
              icon={<Tool className="w-10 h-10 mb-4 text-orange-600 dark:text-orange-400" />}
              href="/products?category=accessories"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center p-6 space-y-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Quality Guarantee</h3>
              <p className="text-muted-foreground">All our products are thoroughly tested and come with reliable warranty.</p>
            </div>
            
            <div className="flex flex-col items-center p-6 space-y-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Islandwide Delivery</h3>
              <p className="text-muted-foreground">Fast and secure delivery to your doorstep, anywhere in Sri Lanka.</p>
            </div>
            
            <div className="flex flex-col items-center p-6 space-y-4">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center">
                <Headphones className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Expert Support</h3>
              <p className="text-muted-foreground">Professional technical support for setups, upgrades, and repairs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-white">Need Technical Assistance?</h2>
          <p className="text-xl mb-10 text-white/80">Our experts are ready to help you with computer upgrades, phone unlocking, and more.</p>
          <Link 
            href="https://wa.me/94710678944" 
            target="_blank"
            className={cn(buttonVariants({ variant: "success", size: "lg" }), "text-lg h-14 px-10 rounded-full")}
          >
            Chat on WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ title, desc, icon, href }: { title: string, desc: string, icon: React.ReactNode, href: string }) {
  return (
    <Link href={href} className="group flex flex-col items-center text-center p-8 rounded-2xl bg-card border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="p-4 rounded-full bg-muted group-hover:bg-muted/80 transition-colors mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </Link>
  )
}
