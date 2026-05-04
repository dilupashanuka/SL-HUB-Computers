import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ArrowLeft, Star, Cpu, CheckCircle2, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const CAT_STYLES: Record<string, { border: string; text: string; bg: string; label: string }> = {
  gaming:      { border: 'border-red-500/30',    text: 'text-red-400',    bg: 'bg-red-500/10',    label: '🎮 Gaming' },
  office:      { border: 'border-blue-500/30',   text: 'text-blue-400',   bg: 'bg-blue-500/10',   label: '💼 Office' },
  budget:      { border: 'border-green-500/30',  text: 'text-green-400',  bg: 'bg-green-500/10',  label: '💰 Budget' },
  workstation: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10', label: '⚙️ Workstation' },
  streaming:   { border: 'border-yellow-500/30', text: 'text-yellow-400', bg: 'bg-yellow-500/10', label: '📡 Streaming' },
};

export default async function PreBuildDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: build } = await supabase
    .from('pc_builds')
    .select(`
      *,
      pc_build_components(
        id, component_type, custom_name, custom_price, quantity,
        products(*)
      )
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (!build) notFound();

  const style = CAT_STYLES[build.category] || CAT_STYLES.gaming;

  const whatsappMsg = encodeURIComponent(
    `Hi SL HUB! I'd like to order the "${build.name}" pre-built PC.\n\n` +
    `💰 Price: Rs. ${Number(build.total_price).toLocaleString()}\n` +
    `🖥️ Category: ${build.category}\n\n` +
    `Components:\n` +
    build.pc_build_components
      ?.map((c: any) => `• ${c.component_type}: ${c.products?.name || c.custom_name || 'TBD'}`)
      .join('\n') +
    `\n\nPlease confirm availability!`
  );

  const components = build.pc_build_components || [];

  return (
    <main className="min-h-screen bg-[#080c14] pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Back button */}
        <Link href="/pc-builder" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to PC Builder
        </Link>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Hero Image + Quick Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="aspect-square relative bg-slate-900 rounded-[3rem] overflow-hidden border border-white/5">
              {build.image_url ? (
                <Image src={build.image_url} alt={build.name} fill sizes="40vw" className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-24 h-24 text-slate-700" />
                </div>
              )}
              {build.is_featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/30 rounded-full">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Featured</span>
                </div>
              )}
            </div>

            {/* Price Card */}
            <div className="p-6 bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 rounded-[2.5rem] space-y-5">
              <div>
                <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-2">Total Price</p>
                <p className="text-4xl font-black text-white">
                  {build.total_price ? `Rs. ${Number(build.total_price).toLocaleString()}` : 'Contact Us'}
                </p>
                <p className="text-xs text-slate-500 mt-1">{components.length} components included</p>
              </div>
              <Link
                href={`https://wa.me/94710678944?text=${whatsappMsg}`}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full h-14 bg-primary text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                <MessageCircle className="w-5 h-5" /> Order via WhatsApp
              </Link>
              <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest">
                We'll confirm parts availability &amp; delivery
              </p>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={cn("px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border", style.border, style.text, style.bg)}>
                  {style.label}
                </span>
                {build.badge_text && (
                  <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400">
                    {build.badge_text}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                {build.name}
              </h1>
              {build.description && (
                <p className="text-slate-400 text-lg leading-relaxed">{build.description}</p>
              )}
            </div>

            {/* Components List */}
            {components.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-[10px] text-primary font-black uppercase tracking-widest">
                  What's Inside — {components.length} Components
                </h2>
                <div className="space-y-3">
                  {components.map((comp: any) => {
                    const product = comp.products;
                    const name = product?.name || comp.custom_name || 'TBD';
                    const price = product?.price || comp.custom_price || 0;
                    const total = price * comp.quantity;

                    return (
                      <div key={comp.id} className="group bg-slate-900/50 border border-white/5 hover:border-white/10 rounded-[2rem] p-4 transition-all">
                        <div className="flex gap-4">
                          {/* Component Image */}
                          <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-[#0a0d14] border border-white/5 overflow-hidden relative">
                            {product?.image ? (
                              <Image src={product.image} alt={name} fill sizes="64px" className="object-contain p-2" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Cpu className="w-6 h-6 text-slate-700" />
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-0.5">
                                  {comp.component_type}{comp.quantity > 1 ? ` × ${comp.quantity}` : ''}
                                </p>
                                <p className="text-white font-bold leading-snug">{name}</p>
                                {product?.brand && (
                                  <p className="text-[11px] text-slate-500 mt-0.5">{product.brand}</p>
                                )}
                              </div>
                              <p className="text-white font-black flex-shrink-0">
                                Rs. {Number(total).toLocaleString()}
                              </p>
                            </div>

                            {/* Description */}
                            {product?.description && (
                              <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                                {product.description}
                              </p>
                            )}

                            {/* Specs chips */}
                            {product?.specifications && Object.keys(product.specifications).length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {Object.entries(product.specifications).slice(0, 4).map(([k, v]) => (
                                  <span key={k} className="px-2 py-0.5 text-[10px] font-bold text-slate-400 bg-white/5 border border-white/5 rounded-full">
                                    {k}: {String(v)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center gap-4 text-center border border-white/5 rounded-[2rem]">
                <Package className="w-12 h-12 text-slate-700" />
                <p className="text-slate-500">Components list coming soon.</p>
              </div>
            )}

            {/* Why this build */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '⚡', label: 'Same-Day Build', desc: 'Ready in hours' },
                { icon: '🛡️', label: 'Warranty', desc: 'All parts covered' },
                { icon: '🤝', label: 'Expert Support', desc: 'Free after-sales' },
              ].map(item => (
                <div key={item.label} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-center">
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="text-xs font-black text-white uppercase tracking-widest">{item.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
