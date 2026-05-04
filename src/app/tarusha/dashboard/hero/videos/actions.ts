'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addHeroVideo(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const videoFile = formData.get('video') as File;
  
  if (!videoFile || videoFile.size === 0) {
    throw new Error("No video selected");
  }

  const fileName = `${Date.now()}-${videoFile.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('hero-videos')
    .upload(fileName, videoFile);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('hero-videos')
    .getPublicUrl(fileName);

  await supabase.from('hero_videos').insert([{
    title,
    subtitle,
    video_url: publicUrl,
    order_index: 0
  }]);

  revalidatePath('/tarusha/dashboard/hero-videos');
  revalidatePath('/');
}

export async function deleteHeroVideo(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const videoUrl = formData.get('video_url') as string;

  if (videoUrl) {
    const fileName = videoUrl.split('/').pop();
    if (fileName) {
      await supabase.storage.from('hero-videos').remove([fileName]);
    }
  }

  await supabase.from('hero_videos').delete().eq('id', id);

  revalidatePath('/tarusha/dashboard/hero-videos');
  revalidatePath('/');
}
