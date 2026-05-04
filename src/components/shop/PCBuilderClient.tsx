"use client"

import { useState } from 'react';
import { Cpu, Monitor, HardDrive, Zap, Square, Component, LayoutGrid, CheckCircle2, ChevronRight, MessageCircle, Star, Package, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────
interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  brand?: string;
  category?: string;
  specifications?: Record<string, string>;
}

interface BuildComponent {
  id: string;
  component_type: string;
  custom_name?: string;
  custom_price?: number;
  quantity: number;
  products?: Product;
}

interface PreBuild {
  id: string;
  name: string;
  description?: string;
  category: string;
  total_price: number;
  is_featured: boolean;
  image_url?: string;
  badge_text?: string;
  pc_build_components: BuildComponent[];
}

// ─── Constants ───────────────────────────────────────────
const COMPONENT_STEPS = [
  { id: 'CPU',         label: 'Processor',      icon: Cpu },
  { id: 'Motherboard', label: 'Motherboard',     icon: Square },
  { id: 'RAM',         label: 'Memory (RAM)',    icon: Component },
  { id: 'GPU',         label: 'Graphics Card',  icon: Monitor },
  { id: 'Storage',     label: 'Storage',         icon: HardDrive },
  { id: 'PSU',         label: 'Power Supply',   icon: Zap },
  { id: 'Case',        label: 'Case',            icon: LayoutGrid },
];

const CATEGORY_STYLES: Record<string, { color: string; label: string; glow: string }> = {
  gaming:      { color: 'border-red-500/30 bg-red-500/10 text-red-400',       label: '🎮 Gaming',      glow: 'shadow-red-500/20' },
  office:      { color: 'border-blue-500/30 bg-blue-500/10 text-blue-400',    label: '💼 Office',      glow: 'shadow-blue-500/20' },
  budget:      { color: 'border-green-500/30 bg-green-500/10 text-green-400', label: '💰 Budget',      glow: 'shadow-green-500/20' },
  workstation: { color: 'border-purple-500/30 bg-purple-500/10 text-purple-400', label: '⚙️ Workstation', glow: 'shadow-purple-500/20' },
  streaming:   { color: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400', label: '📡 Streaming',  glow: 'shadow-yellow-500/20' },
};

// ─── Props ───────────────────────────────────────────────
interface PCBuilderClientProps {
  preBuilds: PreBuild[];
  products: Product[];
}

// ─── Main Component ───────────────────────────────────────
export function PCBuilderClient({ preBuilds, products }: PCBuilderClientProps) {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'custom'>('prebuilt');
  const [selectedBuild, setSelectedBuild] = useState<PreBuild | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Tab Switcher */}
      <div className="flex gap-2 p-1.5 bg-white/5 border border-white/5 rounded-2xl w-fit mx-auto mb-12">
        <button
          onClick={() => setActiveTab('prebuilt')}
          className={cn(
            "px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
            activeTab === 'prebuilt'
              ? "bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              : "text-slate-400 hover:text-white"
          )}
        >
          🎯 Ready Builds
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={cn(
            "px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
            activeTab === 'custom'
              ? "bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              : "text-slate-400 hover:text-white"
          )}
        >
          🔧 Custom Build
        </button>
      </div>

      {/* Tab: Ready Builds */}
      {activeTab === 'prebuilt' && (
        <PreBuiltTab preBuilds={preBuilds} onSelect={setSelectedBuild} />
      )}

      {/* Tab: Custom Builder */}
      {activeTab === 'custom' && (
        <CustomBuilderTab products={products} />
      )}

      {/* Build Detail Modal */}
      {selectedBuild && (
        <BuildDetailModal build={selectedBuild} onClose={() => setSelectedBuild(null)} />
      )}
    </div>
  );
}

// ─── Pre-Built Tab ────────────────────────────────────────
function PreBuiltTab({ preBuilds, onSelect }: { preBuilds: PreBuild[]; onSelect: (b: PreBuild) => void }) {
  if (preBuilds.length === 0) {
    return (
      <div className="py-32 flex flex-col items-center gap-6 text-center">
        <Package className="w-16 h-16 text-slate-700" />
        <div>
          <p className="text-white font-black text-xl uppercase tracking-tighter mb-2">No Preset Builds Yet</p>
          <p className="text-slate-500 text-sm">Check back soon or use the Custom Builder above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {preBuilds.map((build) => {
        const style = CATEGORY_STYLES[build.category] || CATEGORY_STYLES.gaming;
        const componentCount = build.pc_build_components?.length || 0;
        return (
          <div
            key={build.id}
            className={cn(
              "group relative bg-slate-900/60 border rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer",
              build.is_featured ? "border-primary/30 shadow-xl shadow-primary/10" : "border-white/5 hover:border-white/15"
            )}
            onClick={() => onSelect(build)}
          >
            {/* Image / Placeholder */}
            <div className="aspect-video relative bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
              {build.image_url ? (
                <Image src={build.image_url} alt={build.name} fill sizes="50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-slate-700" />
                </div>
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                <span className={cn("px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border", style.color)}>
                  {style.label}
                </span>
                {build.badge_text && (
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400">
                    {build.badge_text}
                  </span>
                )}
              </div>
              {build.is_featured && (
                <div className="absolute top-4 right-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                  {build.name}
                </h3>
                {build.description && (
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{build.description}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Starting From</p>
                  <p className="text-2xl font-black text-white">
                    {build.total_price ? `Rs. ${Number(build.total_price).toLocaleString()}` : 'Contact Us'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Parts</p>
                  <p className="text-xl font-black text-white">{componentCount}</p>
                </div>
              </div>

              <button className="w-full h-11 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all">
                View Full Specs →
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Custom Builder Tab ───────────────────────────────────
function CustomBuilderTab({ products }: { products: Product[] }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedParts, setSelectedParts] = useState<Record<string, Product | null>>({});

  const step = COMPONENT_STEPS[currentStep];
  const totalPrice = Object.values(selectedParts).filter(Boolean).reduce((s, p) => s + (p?.price || 0), 0);
  const selectedCount = Object.values(selectedParts).filter(Boolean).length;

  // Filter products relevant to current step type (basic match by category/specs)
  const stepProducts = products.length > 0 ? products : [];

  const buildSummary = COMPONENT_STEPS.map(s => ({
    ...s,
    part: selectedParts[s.id] ?? null,
  }));

  const whatsappMsg = encodeURIComponent(
    `Hi SL HUB! I'd like a quote for this custom PC build:\n\n` +
    buildSummary.filter(s => s.part).map(s => `• ${s.label}: ${s.part!.title} — Rs. ${s.part!.price.toLocaleString()}`).join('\n') +
    `\n\nEstimated Total: Rs. ${totalPrice.toLocaleString()}`
  );

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Left: Steps + Summary */}
      <div className="lg:col-span-4 space-y-6">
        {/* Step selector */}
        <div className="space-y-2">
          {COMPONENT_STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left",
                i === currentStep
                  ? "bg-primary/10 border-primary/30 text-white"
                  : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/10"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                  selectedParts[s.id] ? "bg-green-500 text-white" : i === currentStep ? "bg-primary text-white" : "bg-slate-800 text-slate-600"
                )}>
                  <s.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Step {i + 1}</p>
                  <p className="text-sm font-bold uppercase tracking-tight">{s.label}</p>
                </div>
              </div>
              {selectedParts[s.id] && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
            </button>
          ))}
        </div>

        {/* Price Card */}
        <div className="p-6 bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 rounded-[2.5rem] space-y-4">
          <div>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">Live Total</p>
            <p className="text-4xl font-black text-white">Rs. {totalPrice.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">{selectedCount} of {COMPONENT_STEPS.length} parts selected</p>
          </div>

          {selectedCount > 0 ? (
            <Link
              href={`https://wa.me/94710678944?text=${whatsappMsg}`}
              target="_blank"
              className="flex items-center justify-center gap-2 w-full h-12 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <MessageCircle className="w-4 h-4" />
              Get WhatsApp Quote
            </Link>
          ) : (
            <p className="text-center text-xs text-slate-600 font-bold uppercase tracking-widest py-2">
              Select parts to get a quote
            </p>
          )}
        </div>
      </div>

      {/* Right: Product Picker */}
      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Select {step.label}</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
              {stepProducts.length} products available
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}
              className="w-10 h-10 glass rounded-xl border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 transition-all flex items-center justify-center">
              ‹
            </button>
            <button onClick={() => setCurrentStep(Math.min(COMPONENT_STEPS.length - 1, currentStep + 1))} disabled={currentStep === COMPONENT_STEPS.length - 1}
              className="w-10 h-10 glass rounded-xl border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 transition-all flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {stepProducts.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-4 text-center">
            <Package className="w-12 h-12 text-slate-700" />
            <p className="text-slate-500 font-bold">No products in inventory yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {stepProducts.slice(0, 12).map((product) => {
              const isSelected = selectedParts[step.id]?.id === product.id;
              return (
                <div
                  key={product.id}
                  className={cn(
                    "group relative rounded-[2rem] border transition-all duration-300 overflow-hidden cursor-pointer",
                    isSelected ? "border-primary/60 bg-primary/10 shadow-lg shadow-primary/20" : "border-white/5 bg-slate-900/50 hover:border-white/15"
                  )}
                  onClick={() => setSelectedParts(prev => ({ ...prev, [step.id]: isSelected ? null : product }))}
                >
                  {/* Image */}
                  <div className="aspect-square relative bg-[#0a0d14]">
                    {product.image_url ? (
                      <Image src={product.image_url} alt={product.title} fill sizes="25vw" className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <step.icon className="w-10 h-10 text-slate-800" />
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    {product.brand && (
                      <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">{product.brand}</p>
                    )}
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug mb-2">{product.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-black text-white">
                        Rs. {product.price ? Number(product.price).toLocaleString() : 'N/A'}
                      </p>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg transition-all",
                        isSelected ? "bg-primary text-white" : "bg-white/5 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
                      )}>
                        {isSelected ? '✓ Selected' : 'Pick'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Build Detail Modal ───────────────────────────────────
function BuildDetailModal({ build, onClose }: { build: PreBuild; onClose: () => void }) {
  const style = CATEGORY_STYLES[build.category] || CATEGORY_STYLES.gaming;

  const whatsappMsg = encodeURIComponent(
    `Hi SL HUB! I'm interested in the "${build.name}" pre-built PC.\n\nPrice: Rs. ${Number(build.total_price).toLocaleString()}\nCategory: ${build.category}\n\nPlease provide more details!`
  );

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-20">
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="aspect-video relative bg-gradient-to-br from-slate-800 to-slate-950">
          {build.image_url ? (
            <Image src={build.image_url} alt={build.name} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="w-20 h-20 text-slate-700" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={cn("px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border", style.color)}>
                {style.label}
              </span>
              {build.badge_text && (
                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400">
                  {build.badge_text}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">{build.name}</h2>
            {build.description && <p className="text-slate-400 mt-2">{build.description}</p>}
          </div>

          {/* Components List */}
          {build.pc_build_components && build.pc_build_components.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[10px] text-primary font-black uppercase tracking-widest">Included Components</h3>
              <div className="space-y-2">
                {build.pc_build_components.map((comp) => (
                  <div key={comp.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">{comp.component_type}</p>
                        <p className="text-sm font-bold text-white">
                          {comp.products?.title || comp.custom_name || 'TBD'}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-black text-white flex-shrink-0">
                      Rs. {((comp.products?.price || comp.custom_price || 0) * comp.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between p-6 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
            <div>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">Total Price</p>
              <p className="text-3xl font-black text-white">
                {build.total_price ? `Rs. ${Number(build.total_price).toLocaleString()}` : 'Contact for Price'}
              </p>
            </div>
            <Link
              href={`https://wa.me/94710678944?text=${whatsappMsg}`}
              target="_blank"
              className="flex items-center gap-2 px-6 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              <MessageCircle className="w-4 h-4" />
              Order via WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
