"use client"

import { useState, useRef } from "react";
import { Cpu, Monitor, Smartphone, LayoutGrid, CheckCircle2, ChevronRight, MessageCircle, RotateCcw, ShieldCheck, Zap, HardDrive, Square, Settings, Component, Info, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const STEPS = [
  { id: 'processor', label: 'Processor', icon: Cpu },
  { id: 'motherboard', label: 'Motherboard', icon: Square },
  { id: 'memory', label: 'Memory (RAM)', icon: Component },
  { id: 'graphics', label: 'Graphics Card', icon: Monitor },
  { id: 'storage', label: 'Storage (SSD/HDD)', icon: HardDrive },
  { id: 'power', label: 'Power Supply', icon: Zap },
  { id: 'casing', label: 'Casing', icon: LayoutGrid },
];

export default function PCBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedParts, setSelectedParts] = useState<Record<string, any>>({});
  const [detailProduct, setDetailProduct] = useState<any>(null);
  const selectionRef = useRef<HTMLDivElement>(null);

  const handleStepChange = (i: number) => {
    setCurrentStep(i);
    if (window.innerWidth < 1024) {
      selectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const togglePart = (stepId: string, part: any) => {
    setSelectedParts(prev => ({
      ...prev,
      [stepId]: prev[stepId]?.id === part.id ? null : part
    }));
  };

  const totalPrice = Object.values(selectedParts)
    .filter(Boolean)
    .reduce((sum, part) => sum + (part.price || 0), 0);

  const currentStepInfo = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-slate-950 pt-40 pb-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Configuration Steps */}
          <div className="lg:col-span-4 w-full lg:w-96 shrink-0 space-y-6">
            <div className="space-y-4 mb-10">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">Expert Tool</span>
              <h1 className="text-5xl font-black text-white tracking-tighter">PC Builder</h1>
            </div>

            <div className="space-y-3">
              {STEPS.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => handleStepChange(i)}
                  className={cn(
                    "w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 text-left",
                    i === currentStep 
                      ? "bg-primary/10 border-primary/50 text-white shadow-[0_0_30px_rgba(59,130,246,0.2)]" 
                      : "bg-white/5 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                      selectedParts[step.id] ? "bg-green-500 text-white" : i === currentStep ? "bg-primary text-primary-foreground" : "bg-slate-900 text-slate-600"
                    )}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest block mb-1">Step 0{i + 1}</span>
                      <span className="text-sm font-bold uppercase tracking-tight">{step.label}</span>
                    </div>
                  </div>
                  {selectedParts[step.id] && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                </button>
              ))}
            </div>

            {/* Price Summary Sticky Card */}
            <div className="p-10 glass rounded-[3rem] border-primary/20 space-y-8 mt-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16" />
               <div className="relative z-10">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block mb-4">Live Quote</span>
                <div className="text-5xl font-black text-white tracking-tighter">Rs. {totalPrice.toLocaleString()}</div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Estimated Total</p>
                
                <div className="pt-10 space-y-4">
                  <button className="w-full h-16 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 transition-all">
                    Generate Quote
                  </button>
                  <Link 
                    href={`https://wa.me/94710678944?text=I've built a PC configuration on SL HUB! Total: Rs. ${totalPrice.toLocaleString()}`}
                    target="_blank"
                    className="w-full h-16 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send to Expert
                  </Link>
                </div>
               </div>
            </div>
          </div>

          {/* Right: Component Selection Area */}
          <div ref={selectionRef} className="flex-1 space-y-12 scroll-mt-32">
            <div className="flex items-center justify-between pb-8 border-b border-white/5">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Select {currentStepInfo.label}</h2>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Showing 12 compatible components</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-4 glass rounded-2xl text-slate-400 hover:text-white transition-all"><Settings className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Components Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => {
                const mockPart = { 
                  id: `${currentStepInfo.id}-${i}`, 
                  title: `${currentStepInfo.label} Model X${i}00`, 
                  price: 15000 + (i * 2500),
                  image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop'
                };
                const isSelected = selectedParts[currentStepInfo.id]?.id === mockPart.id;

                return (
                  <div 
                    key={mockPart.id}
                    className={cn(
                      "group relative p-6 rounded-[2.5rem] border transition-all duration-500 overflow-hidden",
                      isSelected 
                        ? "bg-primary/10 border-primary/50" 
                        : "bg-white/5 border-white/5 hover:border-white/20"
                    )}
                  >
                    <div 
                      className="aspect-square relative rounded-3xl overflow-hidden mb-6 bg-slate-900 cursor-pointer"
                      onClick={() => setDetailProduct(mockPart)}
                    >
                      <Image src={mockPart.image} alt={mockPart.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                         <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                            <Info className="w-6 h-6" />
                         </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-white leading-tight line-clamp-1 uppercase tracking-tight">{mockPart.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-black">Rs. {mockPart.price.toLocaleString()}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setDetailProduct(mockPart)}
                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all"
                          >
                            <Info className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => togglePart(currentStepInfo.id, mockPart)}
                            className={cn(
                              "h-10 px-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                              isSelected ? "bg-green-500 text-white" : "bg-primary text-primary-foreground"
                            )}
                          >
                            {isSelected ? "Selected" : "Select"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-12 border-t border-white/5">
              <button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className="px-10 h-16 glass border-white/10 text-white font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 disabled:opacity-30"
                disabled={currentStep === 0}
              >
                Previous Step
              </button>
              <button 
                onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
                className="px-10 h-16 bg-white text-slate-950 font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 disabled:opacity-30"
                disabled={currentStep === STEPS.length - 1}
              >
                Next Step
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {detailProduct && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setDetailProduct(null)} />
          <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
             <button 
              onClick={() => setDetailProduct(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all z-20"
             >
               <X className="w-6 h-6" />
             </button>

             <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square relative bg-slate-950">
                   <Image src={detailProduct.image} alt={detailProduct.title} fill className="object-cover" />
                </div>
                <div className="p-10 md:p-16 flex flex-col justify-center space-y-8">
                   <div className="space-y-4">
                     <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Component Details</span>
                     <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-tight">{detailProduct.title}</h2>
                     <p className="text-3xl font-bold text-white">Rs. {detailProduct.price.toLocaleString()}</p>
                   </div>

                   <div className="space-y-6">
                      <div className="grid gap-4">
                         <div className="flex items-center gap-4 text-slate-400">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium">3 Year Official Warranty</span>
                         </div>
                         <div className="flex items-center gap-4 text-slate-400">
                            <Zap className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium">Compatible with Selected Parts</span>
                         </div>
                      </div>

                      <p className="text-slate-500 text-sm leading-relaxed">
                        This premium {currentStepInfo.label} is selected for high-performance builds. It features the latest technology and optimized thermal performance for intensive workloads.
                      </p>
                   </div>

                   <div className="flex gap-4">
                      <Button 
                        onClick={() => {
                          togglePart(currentStepInfo.id, detailProduct);
                          setDetailProduct(null);
                        }}
                        className="flex-1 h-16 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-2xl"
                      >
                        {selectedParts[currentStepInfo.id]?.id === detailProduct.id ? "Deselect" : "Select Component"}
                      </Button>
                      <Link 
                        href="https://wa.me/94710678944" 
                        target="_blank"
                        className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-white"
                      >
                        <MessageCircle className="w-6 h-6" />
                      </Link>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
