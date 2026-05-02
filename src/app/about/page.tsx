import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About SL HUB COMPUTER</h1>
          <p className="text-lg text-muted-foreground">
            The New Experience of Technology in Deiyandara.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              SL HUB COMPUTER was established with a clear mission: to bring high-quality, reliable, and affordable technology to the people of Deiyandara and beyond. We recognized the growing need for dependable computing devices and smartphones in our community.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What started as a small venture has now grown into a trusted destination for Korean branded and used desktop computers, the latest mobile phones, and a comprehensive range of tech accessories.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our commitment goes beyond just selling products. We pride ourselves on providing exceptional after-sales support, setup upgrades, and repair services to ensure our customers get the most out of their technological investments.
            </p>
          </div>
          <div className="bg-muted rounded-3xl p-8 aspect-square flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
            <h3 className="text-2xl font-bold text-foreground relative z-10 mb-2">SL HUB</h3>
            <p className="text-primary font-medium tracking-widest relative z-10 uppercase">Computer</p>
            <div className="mt-8 text-sm text-muted-foreground max-w-[200px] relative z-10">
              "The New Experience of Technology"
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-3xl p-10 mb-20 border border-border">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">1</span>
                Quality Assurance
              </h4>
              <p className="text-muted-foreground pl-10">Every product we sell undergoes rigorous testing to meet our high standards before it reaches your hands.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">2</span>
                Expert Knowledge
              </h4>
              <p className="text-muted-foreground pl-10">Our team consists of passionate tech enthusiasts who can guide you to the perfect solution for your needs and budget.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">3</span>
                Comprehensive Service
              </h4>
              <p className="text-muted-foreground pl-10">From initial setup to future upgrades and troubleshooting, we are with you every step of the way.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">4</span>
                Competitive Pricing
              </h4>
              <p className="text-muted-foreground pl-10">We believe everyone deserves access to great technology, which is why we offer the best value in the market.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to upgrade your tech?</h2>
          <div className="flex justify-center gap-4">
            <Link 
              href="/products"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Browse Products
            </Link>
            <Link 
              href="/contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
