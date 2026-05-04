'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addInventorySlide(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const imageFiles = formData.get('images') as unknown as File[];
  
  const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

  for (const file of files) {
    if (file.size === 0) continue;
    
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('site-content')
      .upload(fileName, file);

    if (uploadError) continue;

    const { data: { publicUrl } } = supabase.storage
      .from('site-content')
      .getPublicUrl(fileName);

    await supabase.from('inventory_slides').insert([{
      title,
      subtitle,
      image_url: publicUrl,
      is_active: true
    }]);
  }

  revalidatePath('/tarusha/dashboard/inventory-header');
  revalidatePath('/products');
}

export async function deleteInventorySlide(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const imageUrl = formData.get('image_url') as string;

  if (imageUrl) {
    const fileName = imageUrl.split('/').pop();
    if (fileName) {
      await supabase.storage.from('site-content').remove([fileName]);
    }
  }

  await supabase.from('inventory_slides').delete().eq('id', id);

  revalidatePath('/tarusha/dashboard/inventory-header');
  revalidatePath('/products');
}

export async function updateInventoryHeader(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;

  // Update all records or a specific one? 
  // Usually, title/subtitle are shared. Let's update all for now or have a specific "settings" record.
  // For simplicity, let's update the specific slide.
  
  await supabase.from('inventory_slides')
    .update({ title, subtitle })
    .eq('id', id);

  revalidatePath('/tarusha/dashboard/inventory-header');
  revalidatePath('/products');
}
