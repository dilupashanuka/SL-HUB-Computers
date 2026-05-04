'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateInventoryHeaderText(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;

  // We'll store this in site_settings with a specific key
  const { error } = await supabase.from('site_settings').upsert({
    id: 'inventory_header_text',
    inventory_title: title,
    inventory_subtitle: subtitle
  }, { onConflict: 'id' });

  if (error) throw new Error(error.message);

  revalidatePath('/tarusha/dashboard/inventory-header');
  revalidatePath('/products');
}

export async function addInventorySlide(formData: FormData) {
  const supabase = await createClient();
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

