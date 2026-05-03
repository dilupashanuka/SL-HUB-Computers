'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addHeroSubPost(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const link_url = formData.get('link_url') as string;
  const imageFiles = formData.get('images') as unknown as File[];
  
  if (!imageFiles || (Array.isArray(imageFiles) && imageFiles.length === 0)) {
    throw new Error("No images selected");
  }

  const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

  for (const file of files) {
    if (file.size === 0) continue;
    
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('hero-sub-posts')
      .upload(fileName, file);

    if (uploadError) continue;

    const { data: { publicUrl } } = supabase.storage
      .from('hero-sub-posts')
      .getPublicUrl(fileName);

    await supabase.from('hero_sub_posts').insert([{
      title: title || file.name.split('.')[0],
      link_url,
      image_url: publicUrl,
      order_index: 0
    }]);
  }

  revalidatePath('/tarusha/dashboard/hero-sub-posts');
  revalidatePath('/');
}

export async function deleteHeroSubPost(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const imageUrl = formData.get('image_url') as string;

  if (imageUrl) {
    const fileName = imageUrl.split('/').pop();
    if (fileName) {
      await supabase.storage.from('hero-sub-posts').remove([fileName]);
    }
  }

  await supabase.from('hero_sub_posts').delete().eq('id', id);

  revalidatePath('/tarusha/dashboard/hero-sub-posts');
  revalidatePath('/');
}
