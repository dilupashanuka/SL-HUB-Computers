'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-3xl glass border transition-all duration-300 cursor-pointer group ${
        isOpen ? 'border-primary/30 bg-white/5' : 'border-white/5 hover:border-white/10'
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-8 flex items-center justify-between gap-6">
        <h4 className={`text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white group-hover:text-white'}`}>
          {question}
        </h4>
        <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'border-primary/50 bg-primary/10 rotate-90' 
            : 'border-white/10 group-hover:border-primary/30 group-hover:bg-primary/5'
        }`}>
          <ChevronRight className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`} />
        </div>
      </div>

      {/* Animated answer */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-8 pb-8 text-slate-400 font-medium leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
