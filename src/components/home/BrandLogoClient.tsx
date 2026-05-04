'use client';

import { useState } from 'react';
import Image from 'next/image';

export function BrandLogoClient({ name, logo }: { name: string, logo?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const showText = !logo || hasError || !isLoaded;

  return (
    <div className="relative h-16 w-40 flex items-center justify-center shrink-0">
      {/* Name — always visible until image loads, permanent if no logo / error */}
      <span
        className={`text-lg font-black text-slate-800 uppercase tracking-tighter select-none transition-opacity duration-500 ${
          isLoaded && !hasError ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'
        }`}
      >
        {name}
      </span>

      {/* Image — only mount when we have a URL and no error yet */}
      {logo && !hasError && (
        <div
          className={`absolute inset-0 filter grayscale hover:grayscale-0 transition-all duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={logo}
            alt={name}
            fill
            sizes="160px"
            className="object-contain"
            loading="eager"
            unoptimized
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        </div>
      )}
    </div>
  );
}

