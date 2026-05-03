"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroSubPost {
  id: string;
  image_url: string;
  title: string;
  link_url: string;
}

interface HeroSubPostsProps {
  posts: HeroSubPost[];
}

export function HeroSubPosts({ posts }: HeroSubPostsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!posts || posts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [posts]);

  if (!isMounted || !posts?.length) return null;

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-slate-950">
      {posts.map((post, index) => (
        <Link 
          key={post.id}
          href={post.link_url}
          className={cn(
            "absolute inset-0 block transition-opacity duration-1000 ease-in-out cursor-pointer",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image 
            src={post.image_url} 
            alt={post.title} 
            fill 
            className="object-cover" 
            priority={index === 0}
          />
        </Link>
      ))}

      {/* Slide Indicators */}
      {posts.length > 1 && (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3 z-20">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-1.5 transition-all duration-300 rounded-full",
                i === currentSlide ? "w-10 bg-primary" : "w-4 bg-white/40 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
