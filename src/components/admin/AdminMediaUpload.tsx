"use client"

import { useState } from "react";
import { Plus, Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AdminMediaUploadProps {
  name: string;
  multiple?: boolean;
  required?: boolean;
  accept?: string;
  initialImages?: string | string[];
}

export function AdminMediaUpload({ 
  name, 
  multiple = false, 
  required = false,
  accept = "image/*,video/*",
  initialImages
}: AdminMediaUploadProps) {
  const [previews, setPreviews] = useState<{url: string, isVideo: boolean}[]>(() => {
    if (!initialImages) return [];
    const images = Array.isArray(initialImages) ? initialImages : [initialImages];
    return images.map(url => ({
      url,
      isVideo: url.match(/\.(mp4|webm|ogg|mov)$|^data:video/i) !== null
    }));
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: {url: string, isVideo: boolean}[] = [];
    for (let i = 0; i < files.length; i++) {
      newPreviews.push({
        url: URL.createObjectURL(files[i]),
        isVideo: files[i].type.startsWith('video/')
      });
    }
    setPreviews(newPreviews);
  };

  const clearPreviews = () => {
    previews.forEach(p => URL.revokeObjectURL(p.url));
    setPreviews([]);
  };

  return (
    <div className="space-y-4">
      <div className={`aspect-video rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-pointer bg-white/5 relative overflow-hidden group`}>
        {previews.length > 0 ? (
          <div className={`absolute inset-0 grid ${multiple ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1'} gap-2 p-2`}>
            {previews.slice(0, multiple ? 4 : 1).map((preview, i) => (
              <div key={i} className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                {preview.isVideo ? (
                  <video src={preview.url} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                ) : (
                  <Image src={preview.url} alt="Preview" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                )}
                {multiple && i === 3 && previews.length > 4 && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center text-white font-black text-xs">
                    +{previews.length - 4} MORE
                  </div>
                )}
              </div>
            ))}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
               <span className="text-[10px] font-black text-white uppercase tracking-widest bg-blue-600 px-3 py-1 rounded-full shadow-xl">Click to Change</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-slate-400 group-hover:text-blue-400 group-hover:scale-110 transition-all">
               <Upload className="w-6 h-6" />
            </div>
            <div className="text-center px-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Select Media Assets</p>
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter mt-1">Images or Videos supported</p>
            </div>
          </div>
        )}
        <input 
          type="file" 
          name={name} 
          multiple={multiple} 
          className="absolute inset-0 opacity-0 cursor-pointer" 
          accept={accept}
          required={required && previews.length === 0}
          onChange={handleFileChange}
        />
      </div>
      
      {previews.length > 0 && (
        <div className="flex justify-between items-center px-1">
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{previews.length} File{previews.length > 1 ? 's' : ''} Selected</p>
          <button 
            type="button" 
            onClick={clearPreviews}
            className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors flex items-center gap-1.5"
          >
            <X className="w-3 h-3" /> Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}
