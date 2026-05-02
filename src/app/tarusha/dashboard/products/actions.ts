'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const price = parseFloat(formData.get('price') as string);
  const in_stock = formData.get('in_stock') === 'on';
  const images = formData.getAll('images') as File[];

  const uploadedUrls: string[] = [];

  for (const image of images) {
    if (image.size === 0) continue;

    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('products')
      .upload(filePath, image);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      continue;
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('products')
      .getPublicUrl(filePath);

    uploadedUrls.push(publicUrl);
  }

  const { error } = await supabase
    .from('products')
    .insert([
      {
        title,
        description,
        category,
        price,
        in_stock,
        image_url: uploadedUrls[0] || null,
        images: uploadedUrls
      }
    ]);

  if (error) {
    console.error('Error creating product:', error);
    return { error: error.message };
  }

  revalidatePath('/tarusha/dashboard/products');
  redirect('/tarusha/dashboard/products');
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const price = parseFloat(formData.get('price') as string);
  const in_stock = formData.get('in_stock') === 'on';
  const newImages = formData.getAll('images') as File[];
  const existingImages = JSON.parse(formData.get('existing_images') as string || '[]');

  const uploadedUrls: string[] = [...existingImages];

  for (const image of newImages) {
    if (image.size === 0) continue;

    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('products')
      .upload(filePath, image);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      continue;
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('products')
      .getPublicUrl(filePath);

    uploadedUrls.push(publicUrl);
  }

  const { error } = await supabase
    .from('products')
    .update({
      title,
      description,
      category,
      price,
      in_stock,
      image_url: uploadedUrls[0] || null,
      images: uploadedUrls
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating product:', error);
    return { error: error.message };
  }

  revalidatePath('/tarusha/dashboard/products');
  redirect('/tarusha/dashboard/products');
}

export async function deleteProduct(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  // Optional: Delete images from storage first
  // For now, just delete the DB record
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/products');
}
