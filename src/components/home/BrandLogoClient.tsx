'use client';

import { useState } from 'react';
import Image from 'next/image';

export function BrandLogoClient({ name, logo }: { name: string, logo?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-24 w-48 flex items-center justify-center">
      {/* Name Placeholder - Hidden once loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <span className="text-xl font-black text-slate-900 uppercase tracking-tighter select-none animate-pulse">
            {name}
          </span>
        </div>
      )}
      
      {logo && (
        <div className={`relative h-full w-full filter grayscale hover:grayscale-0 transition-all duration-700 z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Image 
            src={logo} 
            alt={name} 
            fill 
            className="object-contain" 
            loading="eager"
            unoptimized
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      )}
    </div>
  );
}
