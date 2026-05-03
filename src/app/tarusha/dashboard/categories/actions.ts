'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addCategory(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get('name') as string;
  const parent_id = formData.get('parent_id') as string || null;
  const description = formData.get('description') as string || null;
  const image = formData.get('image') as File | null;
  const is_featured = formData.get('is_featured') === 'on';
  
  const inventory_type = formData.get('inventory_type') as string;
  
  const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  let image_url = null;
  
  if (image && image.size > 0) {
    const fileName = `${Date.now()}-${image.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('categories')
      .upload(fileName, image);

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('categories')
        .getPublicUrl(fileName);
      image_url = publicUrl;
    }
  }

  const { error } = await supabase
    .from('categories')
    .insert([{ name, slug, parent_id, description, image_url, is_featured, inventory_type }]);

  revalidatePath('/tarusha/dashboard/categories');
  revalidatePath('/');
}

export async function deleteCategory(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/categories');
  revalidatePath('/');
}

export async function toggleFeaturedCategory(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const is_featured = formData.get('is_featured') === 'true';

  await supabase
    .from('categories')
    .update({ is_featured: !is_featured })
    .eq('id', id);

  revalidatePath('/tarusha/dashboard/categories');
  revalidatePath('/');
}
