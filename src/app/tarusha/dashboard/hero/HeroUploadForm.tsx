"use client"

import { useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { uploadHeroSlides } from "./actions";

import { AdminMediaUpload } from "@/components/admin/AdminMediaUpload";

export function HeroUploadForm() {
  return (
    <form 
      action={uploadHeroSlides} 
      className="space-y-4"
    >
      <AdminMediaUpload name="images" multiple required />
      
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl">
        Add to Showcase
      </Button>
    </form>
  );
}
