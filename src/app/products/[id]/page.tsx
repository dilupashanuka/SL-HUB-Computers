import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingCart, MessageCircle, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductGallery } from '@/components/shop/ProductGallery';
import { WishlistButton } from '@/components/shop/WishlistButton';

export const revalidate = 0;

export default async function ProductDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Fetch related products
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', id)
    .limit(4);

  const whatsappUrl = `https://wa.me/94710678944?text=I'm interested in ${product.title} (ID: ${product.id}). Please provide more details.`;

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-40">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-primary transition-colors">Inventory</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-300">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <ProductGallery
              images={[
                product.image_url,
                ...(Array.isArray(product.images) ? product.images : [])
              ].filter(Boolean)}
              title={product.title}
            />
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">
                {product.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-6">
                <div className="text-4xl font-black text-white">
                  {product.price ? `Rs. ${product.price.toLocaleString()}` : 'Price on Request'}
                </div>
                {product.in_stock ? (
                  <div className="flex items-center gap-2 text-green-500 text-xs font-black uppercase tracking-widest bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    In Stock
                  </div>
                ) : (
                  <div className="text-red-500 text-xs font-black uppercase tracking-widest bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                    Sold Out
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
              <h3 className="text-sm font-black uppercase tracking-widest text-white mb-3">Product Description</h3>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                {product.description || `Experience premium performance and reliability with the ${product.title}. This ${product.category} is carefully selected by SL HUB to ensure the best quality for your computing needs.`}
              </p>
            </div>

            {/* Quick Specs Mini Grid */}
            <div className="grid grid-cols-2 gap-4">
              <SpecBox label="Warranty" value="3 Years Genuine" />
              <SpecBox label="Condition" value="Brand New" />
              <SpecBox label="Delivery" value="Islandwide" />
              <SpecBox label="Support" value="24/7 Expert Help" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href={whatsappUrl}
                target="_blank"
                className={cn(
                  buttonVariants({ size: "lg" }), 
                  "flex-1 h-20 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest rounded-[2rem] shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center gap-3 text-lg"
                )}
              >
                <MessageCircle className="w-6 h-6" />
                Buy on WhatsApp
              </Link>
              <WishlistButton productId={product.id} size="lg" />
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-6">
              <FeatureItem text="Safe and secure door-step delivery" />
              <FeatureItem text="Islandwide 1-2 day fast shipping" />
              <FeatureItem text="Full technical assistance for setup" />
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Specs) */}
        <div className="mt-32 border-t border-white/5 pt-20">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-black text-white tracking-tighter mb-12">Technical Specifications</h2>
            <div className="glass rounded-[3rem] overflow-hidden border-white/10 p-8 md:p-12">
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <div className="flex flex-col text-sm">
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <div 
                      key={key} 
                      className={cn(
                        "grid grid-cols-1 md:grid-cols-3 p-4 md:p-6 gap-4 md:gap-8 border-b border-white/5 last:border-0",
                        idx % 2 === 0 ? "bg-white/[0.02] rounded-2xl" : "bg-transparent"
                      )}
                    >
                      <div className="col-span-1 text-slate-400 font-bold uppercase text-xs tracking-[0.2em] flex items-center">{key}</div>
                      <div className="col-span-2 text-slate-200 font-medium text-base">{value as string}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 leading-relaxed text-lg text-center py-10">No specific technical details available for this product.</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-40">
            <div className="flex items-end justify-between mb-16">
              <div className="space-y-4">
                <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">People also bought</span>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Related Products</h2>
              </div>
              <Link href="/products" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">View All Shop</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
      <Zap className="w-3 h-3 text-primary" />
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{label}</span>
    </div>
  );
}

function SpecBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">{label}</span>
      <span className="text-sm font-bold text-white uppercase tracking-tight">{value}</span>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2 className="w-5 h-5 text-primary" />
      <span className="text-sm font-medium text-slate-400">{text}</span>
    </div>
  );
}
