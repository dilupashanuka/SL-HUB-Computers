'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addPCSlide(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const files = formData.get('images') as unknown as File[];
  
  const logoFiles = Array.isArray(files) ? files : [files];

  for (const file of logoFiles) {
    if (file.size === 0) continue;
    
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('site-content')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Image upload error:', uploadError);
      continue;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('site-content')
      .getPublicUrl(fileName);

    await supabase.from('pc_builder_slides').insert([{
      title: title || 'New PC Build',
      description: description || '',
      image_url: publicUrl,
      is_active: true
    }]);
  }

  revalidatePath('/tarusha/dashboard/pc-builder');
  revalidatePath('/');
}

export async function deletePCSlide(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const imageUrl = formData.get('image_url') as string;

  if (imageUrl) {
    const fileName = imageUrl.split('/').pop();
    if (fileName) {
      await supabase.storage.from('site-content').remove([fileName]);
    }
  }

  await supabase.from('pc_builder_slides').delete().eq('id', id);

  revalidatePath('/tarusha/dashboard/pc-builder');
  revalidatePath('/');
}

export async function togglePCSlide(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  await supabase.from('pc_builder_slides').update({ is_active: !currentStatus }).eq('id', id);
  revalidatePath('/tarusha/dashboard/pc-builder');
  revalidatePath('/');
}
