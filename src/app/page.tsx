import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, Cpu, ShieldCheck, Truck, Headphones, Zap, Shield, Heart, Sparkles, Star, Trophy, ChevronRight, MessageCircle, HelpCircle, Settings } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/home/Hero";
import { VideoReels } from "@/components/home/VideoReels";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { createClient } from "@/utils/supabase/server";
import { HeroVideo } from "@/components/home/HeroVideo";
import { HeroSubPosts } from "@/components/home/HeroSubPosts";
import { TrendingAccessories } from "@/components/home/TrendingAccessories";
import { BrandLogoClient } from '@/components/home/BrandLogoClient';
import { ScrollToTop } from '@/components/utils/ScrollToTop';
import { PCBuilderSlider } from '@/components/home/PCBuilderSlider';
import { FAQItem } from '@/components/home/FAQItem';

export const revalidate = 3600;

export default async function Home() {
  const supabase = await createClient();
  
  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .limit(8)
    .order('created_at', { ascending: false });

  const { data: reels } = await supabase
    .from('video_reels')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(4);

  const { data: heroVideos } = await supabase
    .from('hero_videos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  const { data: subPosts } = await supabase
    .from('hero_sub_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  const { data: partners } = await supabase
    .from('partners')
    .select('*')
    .order('order_index', { ascending: true })
    .order('name', { ascending: true });

  const { data: featuredCategories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_featured', true)
    .limit(3);

  const { data: settingsData } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single();

  // Fetch Accessories (Category slug 'accessories')
  const { data: accessories } = await supabase
    .from('products')
    .select('*, categories!inner(name, slug)')
    .eq('categories.slug', 'accessories')
    .limit(10)
    .order('created_at', { ascending: false });

  // Fix featuredProducts category join if needed
  const { data: featuredProductsWithCat } = await supabase
    .from('products')
    .select('*, categories(name)')
    .limit(8)
    .order('created_at', { ascending: false });

  const displayCategories = featuredCategories && featuredCategories.length > 0 
    ? featuredCategories 
    : [
        { id: '1', name: 'Workstations', description: 'Maximum performance for creators & engineers.', image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2066&auto=format&fit=crop', slug: 'desktops' },
        { id: '2', name: 'Flagships', description: 'The latest mobile tech in your pocket.', image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop', slug: 'phones' },
        { id: '3', name: 'Components', description: 'Build your dream rig from scratch.', image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', slug: 'accessories' }
      ];

  const { data: pcBuilderSlides } = await supabase
    .from('pc_builder_slides')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });


  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <ScrollToTop />
      <Hero 
        slides={slides || []} 
        settings={{
          hero_title: settingsData?.hero_title,
          hero_subtitle: settingsData?.hero_subtitle,
          hero_video_url: settingsData?.hero_video_url
        }} 
      />

      {/* Hero Video Section */}
      <HeroVideo videos={heroVideos || []} />

      {/* Hero Sub Posts Section */}
      <HeroSubPosts posts={subPosts || []} />

      {/* Dynamic Trust Bar */}
      <div className="relative z-30 -mt-20 md:-mt-16 container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 p-6 md:p-10 glass rounded-[2.5rem] md:rounded-[3rem] border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
          <TrustItem icon={<Zap className="w-5 h-5 md:w-6 h-6" />} title="Insane Speed" subtitle="Delivery in 24H" />
          <TrustItem icon={<ShieldCheck className="w-5 h-5 md:w-6 h-6" />} title="Bulletproof" subtitle="3Y Warranty" />
          <TrustItem icon={<Trophy className="w-5 h-5 md:w-6 h-6" />} title="Award Winning" subtitle="Expert Support" />
          <TrustItem icon={<Star className="w-5 h-5 md:w-6 h-6" />} title="5 Star Rated" subtitle="Verified Shop" />
        </div>
      </div>

      {/* Video Reels Section */}
      {reels && reels.length > 0 && <VideoReels reels={reels} />}

      {/* Featured Categories - The "Immersive" Grid */}
      <section className="py-40 relative overflow-hidden">
        <div className="glow-mesh absolute inset-0 opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Discover More</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              Shop by <span className="text-gradient">Power</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                id: 'workstations', 
                title: 'Workstations', 
                desc: 'High-performance custom PCs, Laptops, and Professional Workstations.',
                image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop'
              },
              { 
                id: 'flagships', 
                title: 'Flagships', 
                desc: 'Premium Smartphones, Tablets, and Mobile Ecosystems.',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2070&auto=format&fit=crop'
              },
              { 
                id: 'components', 
                title: 'Components', 
                desc: 'Genuine PC Parts, Accessories, and Gaming Peripherals.',
                image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2070&auto=format&fit=crop'
              }
            ].map(tier => {
              const dbCat = featuredCategories?.find(c => c.inventory_type === tier.id);
              return (
                <CategoryCard 
                  key={tier.id}
                  title={dbCat?.name || tier.title}
                  desc={dbCat?.description || tier.desc}
                  image={dbCat?.image_url || tier.image}
                  href={`/products?inventory=${tier.id}`}
                  stats="Explore"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection reviews={reviews || []} />

      {/* Professional Services - Minimalist & Sleek */}
      <section className="py-40 bg-slate-900/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Settings className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Our Expertise</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                More Than Just <br /><span className="text-gradient">Hardware.</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                We provide end-to-end technical solutions from professional PC building to complex hardware repairs and software optimization.
              </p>
              <Link href="/services" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-white group">
                View All Services
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services?.map((service) => (
                <div key={service.id} className="p-8 rounded-[2.5rem] glass border-white/5 hover:border-primary/20 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{service.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase - Horizontal Infinite Scroll */}
      <section className="py-10 bg-white overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="container mx-auto px-4 mb-6">
          <p className="text-center text-[13px] font-black text-slate-800 uppercase tracking-[0.5em]">Authorized Retailer & Global Partner</p>
        </div>

        <div className="flex overflow-hidden group">
          <div className="flex gap-20 items-center animate-marquee whitespace-nowrap py-4">
            {(partners && partners.length > 0 ? partners : [
              { id: 'p1', name: 'Intel' },
              { id: 'p2', name: 'Nvidia' },
              { id: 'p3', name: 'Asus' },
              { id: 'p4', name: 'Apple' },
              { id: 'p5', name: 'Samsung' },
              { id: 'p6', name: 'MSI' },
              { id: 'p7', name: 'Dell' },
              { id: 'p8', name: 'HP' },
              { id: 'p9', name: 'Gigabyte' },
              { id: 'p10', name: 'Corsair' },
            ]).map((partner) => (
              <BrandLogoClient key={partner.id} name={partner.name} logo={(partner as {logo_url?: string}).logo_url} />
            ))}
            {/* Duplicate for infinite loop */}
            {(partners && partners.length > 0 ? partners : [
              { id: 'p1', name: 'Intel' },
              { id: 'p2', name: 'Nvidia' },
              { id: 'p3', name: 'Asus' },
              { id: 'p4', name: 'Apple' },
              { id: 'p5', name: 'Samsung' },
              { id: 'p6', name: 'MSI' },
              { id: 'p7', name: 'Dell' },
              { id: 'p8', name: 'HP' },
              { id: 'p9', name: 'Gigabyte' },
              { id: 'p10', name: 'Corsair' },
            ]).map((partner) => (
              <BrandLogoClient key={`dup-${partner.id}`} name={partner.name} logo={(partner as {logo_url?: string}).logo_url} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals - Horizontal Scroll Experience */}
      <section className="py-40 bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 mb-20">
          <div className="flex items-end justify-between">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">The Latest</span>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">New Arrivals</h2>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all group">
              Explore All
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
        
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto px-[calc(50vw-640px)] pb-20 no-scrollbar snap-x scroll-px-4">
            {featuredProductsWithCat?.map((product) => (
              <div key={product.id} className="w-[300px] md:w-[400px] shrink-0 snap-start">
                <Link href={`/products?id=${product.id}`} className="group block h-full">
                  <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden glass border-white/5 group-hover:border-primary/50 transition-all duration-700">
                    <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 768px) 300px, 400px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10">
                       <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 block">{product.categories?.name || 'Uncategorized'}</span>
                       <h3 className="text-2xl font-black text-white leading-tight mb-4 group-hover:text-primary transition-colors">{product.name}</h3>
                       <div className="text-xl font-bold text-white">Rs. {product.price.toLocaleString()}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Accessories Section */}
      <TrendingAccessories products={accessories?.map(a => ({ ...a, category: a.categories })) || []} />

      {/* PC Builder CTA - Dynamic Slider */}
      <PCBuilderSlider slides={pcBuilderSlides || []} />

      {/* FAQ Section - High Trust */}
      <section className="py-40 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-24 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-white/10">
              <HelpCircle className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Questions?</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Common Inquiries</h2>
          </div>

          <div className="space-y-4">
            {faqs?.map((faq) => (
              <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final Contact Section */}
      <section className="py-40 bg-slate-950 relative">
        <div className="container mx-auto px-4 text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Need Immediate Help?</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Link 
              href="https://wa.me/94710678944" 
              className="h-16 px-10 glass border-primary/20 text-primary font-black uppercase tracking-widest rounded-full flex items-center gap-3 hover:bg-primary hover:text-white transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </Link>
            <div className="text-slate-500 font-black uppercase tracking-widest text-xs">Or</div>
            <Link 
              href="tel:0710678944" 
              className="h-16 px-10 glass border-white/10 text-white font-black uppercase tracking-widest rounded-full flex items-center gap-3 hover:bg-white hover:text-slate-950 transition-all"
            >
              Call Us: 071 067 8944
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustItem({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="flex items-center gap-3 md:gap-6 group">
      <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-white/5 text-primary flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-white font-black text-[10px] md:text-sm uppercase tracking-widest truncate">{title}</span>
        <span className="text-slate-500 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] truncate">{subtitle}</span>
      </div>
    </div>
  );
}

function CategoryCard({ title, desc, image, href, stats }: { title: string, desc: string, image: string, href: string, stats: string }) {
  return (
    <Link href={href} className="group relative h-[600px] rounded-[3.5rem] overflow-hidden glass border-white/5 hover:border-primary/50 transition-all duration-700 shadow-2xl">
      <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-12 space-y-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">{stats}</span>
        <h3 className="text-5xl font-black text-white tracking-tighter leading-none group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-xs">{desc}</p>
        <div className="pt-4">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-12 transition-all">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </Link>
  )
}
