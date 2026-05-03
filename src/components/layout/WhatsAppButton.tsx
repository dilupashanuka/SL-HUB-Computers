"use client"

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface WhatsAppButtonProps {
  settings?: {
    whatsapp_number: string;
  }
}

export function WhatsAppButton({ settings }: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${settings?.whatsapp_number?.replace(/\D/g, '') || '94710678944'}?text=Hello! I need some expert help with computer products.`;

  return (
    <Link 
      href={whatsappUrl}
      target="_blank"
      className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-[60] group"
    >
      <div className="relative">
        {/* Advanced Ripple Animation */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ 
              scale: [1, 2], 
              opacity: [0.5, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.6,
              ease: "easeOut"
            }}
            className="absolute inset-0 bg-[#25D366] rounded-full"
          />
        ))}
        
        {/* Glow Ring */}
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity" />
        
        {/* Main Button */}
        <motion.div 
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(37,211,102,0.6)] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 border-4 border-white/10"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-lg">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.204l-.651 2.375 2.446-.641c.907.54 1.86.888 2.944.889h.001c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.765-5.766zm3.379 8.273c-.135.378-.684.708-1.047.754-.363.047-.708.067-1.125-.138-.213-.105-.439-.234-.711-.383-1.171-.643-1.928-1.846-1.986-1.924-.058-.078-.469-.624-.469-1.192 0-.568.298-.847.404-.961.106-.114.234-.143.311-.143l.222.004c.08 0 .151-.005.218.156l.334.811c.034.083.053.161.011.244-.042.083-.063.136-.125.208l-.188.222c-.058.067-.12.139-.051.258.07.12.309.51.664.825.456.406.841.532.96.591.12.059.189.049.258-.03.07-.079.298-.348.377-.467.079-.119.158-.1-.266-.259l-.334-.166c-.058-.03-.097-.049-.136-.01l-.234.348c-.078.114-.143.143-.27.078-.126-.065-.532-.196-1.013-.623-.374-.332-.627-.742-.7-.869-.073-.127-.008-.196.056-.26.058-.059.127-.148.19-.222.064-.074.085-.126.127-.21.042-.084.021-.157-.01-.222-.031-.065-.278-.671-.381-.92-.1-.24-.202-.207-.278-.211l-.236-.004c-.157 0-.413.059-.629.293-.216.234-.825.806-.825 1.966 0 1.16.844 2.279.962 2.441.118.162 1.661 2.535 4.023 3.555.562.242.999.387 1.341.497.564.179 1.077.154 1.483.094.452-.067 1.393-.569 1.589-1.121.196-.551.196-1.025.137-1.125-.059-.098-.216-.157-.472-.284zM12.036 0C5.39 0 .002 5.388.002 12.034c0 2.123.551 4.19 1.6 6.013L.002 24l6.136-1.611a11.993 11.993 0 005.898 1.545c6.644 0 12.032-5.388 12.032-12.034C24.068 5.388 18.68 0 12.036 0zm0 21.871c-1.808 0-3.582-.486-5.127-1.405l-.369-.219-3.812.998 1.018-3.716-.24-.381c-.96-1.527-1.468-3.303-1.468-5.114 0-5.421 4.41-9.831 9.834-9.831 2.628 0 5.098 1.023 6.955 2.881 1.857 1.857 2.879 4.328 2.879 6.95 0 5.422-4.411 9.831-9.834 9.831z" />
          </svg>
        </motion.div>

        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="glass px-6 py-2 rounded-full whitespace-nowrap shadow-2xl">
            <span className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Chat with Expert
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
