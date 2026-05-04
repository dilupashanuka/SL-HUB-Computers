"use client"

import { useState, useMemo } from 'react';
import { Cpu, Monitor, HardDrive, Zap, Square, Component, LayoutGrid, CheckCircle2, ChevronRight, ChevronLeft, MessageCircle, Star, Package, X, Info, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const COMPONENT_STEPS = [
  { id: 'CPU',         label: 'Processor',     icon: Cpu },
  { id: 'Motherboard', label: 'Motherboard',    icon: Square },
  { id: 'RAM',         label: 'Memory',         icon: Component },
  { id: 'GPU',         label: 'Graphics Card',  icon: Monitor },
  { id: 'Storage',     label: 'Storage',        icon: HardDrive },
  { id: 'PSU',         label: 'Power Supply',   icon: Zap },
  { id: 'Case',        label: 'Case',           icon: LayoutGrid },
];

const CAT_STYLES: Record<string, { border: string; text: string; bg: string; label: string }> = {
  gaming:      { border: 'border-red-500/30',    text: 'text-red-400',    bg: 'bg-red-500/10',    label: '🎮 Gaming' },
  office:      { border: 'border-blue-500/30',   text: 'text-blue-400',   bg: 'bg-blue-500/10',   label: '💼 Office' },
  budget:      { border: 'border-green-500/30',  text: 'text-green-400',  bg: 'bg-green-500/10',  label: '💰 Budget' },
  workstation: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10', label: '⚙️ Workstation' },
  streaming:   { border: 'border-yellow-500/30', text: 'text-yellow-400', bg: 'bg-yellow-500/10', label: '📡 Streaming' },
};

interface Product {
  id: string; title: string; price: number; image_url?: string;
  brand?: string; category?: string; description?: string;
  specifications?: Record<string, string>;
}

interface BuildComponent {
  id: string; component_type: string; custom_name?: string;
  custom_price?: number; quantity: number; products?: Product;
}

interface PreBuild {
  id: string; name: string; description?: string; category: string;
  total_price: number; is_featured: boolean; image_url?: string;
  badge_text?: string; pc_build_components: BuildComponent[];
}

interface Props {
  preBuilds: PreBuild[];
  products: Product[];
  categoryMapping: Record<string, string | null>;
}

export function PCBuilderClient({ preBuilds, products, categoryMapping }: Props) {
  const [tab, setTab] = useState<'prebuilt' | 'custom'>('prebuilt');
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<string, Product | null>>({});
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const currentStep = COMPONENT_STEPS[step];
  const total = Object.values(selected).filter(Boolean).reduce((s, p) => s + (p?.price || 0), 0);
  const selectedCount = Object.values(selected).filter(Boolean).length;

  // Filter products by mapped category for current step
  const stepProducts = useMemo(() => {
    const catId = categoryMapping[currentStep.id];
    if (!catId) return products;
    return products.filter(p => p.category === catId);
  }, [products, categoryMapping, currentStep.id]);

  const whatsappMsg = encodeURIComponent(
    `Hi SL HUB! Custom PC Build Quote:\n\n` +
    COMPONENT_STEPS.map(s => selected[s.id] ? `• ${s.label}: ${selected[s.id]!.title} — Rs. ${selected[s.id]!.price.toLocaleString()}` : null)
      .filter(Boolean).join('\n') +
    `\n\nTotal: Rs. ${total.toLocaleString()}\nPlease confirm availability!`
  );

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Tab Switcher */}
      <div className="flex gap-2 p-1.5 bg-white/5 border border-white/5 rounded-2xl w-fit mx-auto mb-10">
        {[['prebuilt','🎯 Ready Builds'],['custom','🔧 Custom Build']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key as any)}
            className={cn("px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              tab === key ? "bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]" : "text-slate-400 hover:text-white")}>
            {label}
          </button>
        ))}
      </div>

      {/* ── READY BUILDS TAB ── */}
      {tab === 'prebuilt' && (
        preBuilds.length === 0 ? (
          <div className="py-32 flex flex-col items-center gap-4 text-center">
            <Package className="w-16 h-16 text-slate-700" />
            <p className="text-white font-black text-xl">No preset builds yet — check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preBuilds.map(build => {
              const s = CAT_STYLES[build.category] || CAT_STYLES.gaming;
              return (
                <Link key={build.id} href={`/pc-builder/${build.id}`}
                  className={cn("group relative bg-slate-900/60 rounded-[2.5rem] overflow-hidden border transition-all duration-500 hover:scale-[1.02] block",
                    build.is_featured ? "border-primary/30 shadow-xl shadow-primary/10" : "border-white/5 hover:border-white/15")}>
                  <div className="aspect-video relative bg-slate-800 overflow-hidden">
                    {build.image_url
                      ? <Image src={build.image_url} alt={build.name} fill sizes="50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      : <div className="absolute inset-0 flex items-center justify-center"><Cpu className="w-16 h-16 text-slate-700" /></div>}
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      <span className={cn("px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border", s.border, s.text, s.bg)}>{s.label}</span>
                      {build.badge_text && <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400">{build.badge_text}</span>}
                    </div>
                    {build.is_featured && <Star className="absolute top-4 right-4 w-5 h-5 text-yellow-400 fill-yellow-400" />}
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{build.name}</h3>
                      {build.description && <p className="text-xs text-slate-400 mt-1 line-clamp-2">{build.description}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">From</p>
                        <p className="text-2xl font-black text-white">{build.total_price ? `Rs. ${Number(build.total_price).toLocaleString()}` : 'Ask Us'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Parts</p>
                        <p className="text-xl font-black text-white">{build.pc_build_components?.length || 0}</p>
                      </div>
                    </div>
                    <div className="w-full h-10 bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all flex items-center justify-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5" /> View Full Specs
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )
      )}

      {/* ── CUSTOM BUILD TAB ── */}
      {tab === 'custom' && (
        <div>
          {/* Sticky Summary Bar */}
          <div className="sticky top-20 z-30 mb-6">
            <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-[2rem] px-6 py-4 flex items-center justify-between gap-4 shadow-2xl">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Selected</p>
                  <p className="text-xl font-black text-white">{selectedCount} / {COMPONENT_STEPS.length} parts</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total</p>
                  <p className="text-xl font-black text-white">Rs. {total.toLocaleString()}</p>
                </div>
              </div>
              {selectedCount > 0 ? (
                <Link href={`https://wa.me/94710678944?text=${whatsappMsg}`} target="_blank"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  <MessageCircle className="w-4 h-4" /> Send to Expert
                </Link>
              ) : (
                <span className="text-xs text-slate-600 font-bold uppercase tracking-widest">Pick parts to get a quote</span>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left: Step Selector */}
            <div className="lg:col-span-3 space-y-2">
              {COMPONENT_STEPS.map((s, i) => (
                <button key={s.id} onClick={() => setStep(i)}
                  className={cn("w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left",
                    i === step ? "bg-primary/10 border-primary/30 text-white" : "bg-white/[0.03] border-white/5 text-slate-400 hover:text-white hover:border-white/10")}>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0",
                      selected[s.id] ? "bg-green-500 text-white" : i === step ? "bg-primary text-white" : "bg-slate-800 text-slate-600")}>
                      <s.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Step {i + 1}</p>
                      <p className="text-xs font-bold uppercase tracking-tight">{s.label}</p>
                      {selected[s.id] && <p className="text-[10px] text-primary truncate max-w-[100px]">{selected[s.id]!.title}</p>}
                    </div>
                  </div>
                  {selected[s.id] && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />}
                </button>
              ))}
            </div>

            {/* Right: Product Grid */}
            <div className="lg:col-span-9 space-y-4">
              {/* Step Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Select {currentStep.label}</h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{stepProducts.length} products available</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
                    className="w-9 h-9 glass rounded-xl border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 flex items-center justify-center transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => setStep(Math.min(COMPONENT_STEPS.length - 1, step + 1))} disabled={step === COMPONENT_STEPS.length - 1}
                    className="w-9 h-9 glass rounded-xl border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 flex items-center justify-center transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Cards Grid */}
              {stepProducts.length === 0 ? (
                <div className="py-24 flex flex-col items-center gap-4 text-center border border-white/5 rounded-[2rem]">
                  <Package className="w-12 h-12 text-slate-700" />
                  <p className="text-slate-500 font-bold">No products in this category yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {stepProducts.map(product => {
                    const isSelected = selected[currentStep.id]?.id === product.id;
                    return (
                      <div key={product.id}
                        className={cn("group relative rounded-[1.5rem] border transition-all duration-300 overflow-hidden",
                          isSelected ? "border-primary/60 bg-primary/5 shadow-lg shadow-primary/20" : "border-white/5 bg-slate-900/50 hover:border-white/15")}>
                        {/* Select Circle */}
                        <button
                          onClick={() => setSelected(prev => ({ ...prev, [currentStep.id]: isSelected ? null : product }))}
                          className={cn("absolute top-3 right-3 z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all",
                            isSelected ? "bg-primary border-primary" : "bg-black/40 border-white/30 hover:border-primary/60")}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </button>

                        {/* Info Button */}
                        <button onClick={() => setDetailProduct(product)}
                          className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-black/40 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60">
                          <Info className="w-3.5 h-3.5 text-white" />
                        </button>

                        {/* Image */}
                        <div className="aspect-square relative bg-[#0a0d14] cursor-pointer" onClick={() => setDetailProduct(product)}>
                          {product.image_url
                            ? <Image src={product.image_url} alt={product.title} fill sizes="25vw" className="object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                            : <div className="absolute inset-0 flex items-center justify-center"><currentStep.icon className="w-10 h-10 text-slate-800" /></div>}
                        </div>

                        {/* Info */}
                        <div className="p-3">
                          {product.brand && <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-0.5">{product.brand}</p>}
                          <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug mb-2 cursor-pointer hover:text-primary transition-colors"
                            onClick={() => setDetailProduct(product)}>{product.title}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-base font-black text-white">Rs. {product.price ? Number(product.price).toLocaleString() : '—'}</p>
                            <button
                              onClick={() => setSelected(prev => ({ ...prev, [currentStep.id]: isSelected ? null : product }))}
                              className={cn("text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-xl transition-all",
                                isSelected ? "bg-primary text-white" : "bg-white/5 text-slate-400 hover:bg-primary/10 hover:text-primary")}>
                              {isSelected ? '✓ Selected' : 'Select'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PRODUCT DETAIL MODAL ── */}
      {detailProduct && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setDetailProduct(null)} />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setDetailProduct(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video relative bg-[#080c14]">
              {detailProduct.image_url
                ? <Image src={detailProduct.image_url} alt={detailProduct.title} fill className="object-contain p-6" />
                : <div className="absolute inset-0 flex items-center justify-center"><Cpu className="w-20 h-20 text-slate-700" /></div>}
            </div>
            <div className="p-8 space-y-5">
              {detailProduct.brand && <p className="text-[10px] text-primary font-black uppercase tracking-widest">{detailProduct.brand}</p>}
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">{detailProduct.title}</h2>
              <p className="text-3xl font-black text-white">Rs. {Number(detailProduct.price).toLocaleString()}</p>
              {detailProduct.description && <p className="text-slate-400 text-sm leading-relaxed">{detailProduct.description}</p>}
              {detailProduct.specifications && Object.keys(detailProduct.specifications).length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">Specifications</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(detailProduct.specifications).slice(0, 8).map(([k, v]) => (
                      <div key={k} className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{k}</p>
                        <p className="text-sm font-bold text-white">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => { setSelected(prev => ({ ...prev, [currentStep.id]: detailProduct })); setDetailProduct(null); }}
                className="w-full h-12 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-all">
                Select This Component
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
