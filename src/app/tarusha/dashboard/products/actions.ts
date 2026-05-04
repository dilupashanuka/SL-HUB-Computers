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
  const category_id = formData.get('category_id') as string;
  
  // Get category slug for backward compatibility
  const { data: categoryData } = await supabase
    .from('categories')
    .select('slug')
    .eq('id', category_id)
    .single();
  const category = categoryData?.slug || '';

  const price = parseFloat(formData.get('price') as string);
  const in_stock = formData.get('in_stock') === 'on';
  const inventory_type = formData.get('inventory_type') as string;
  const brand = formData.get('brand') as string;
  const model = formData.get('model') as string;
  const specifications = JSON.parse(formData.get('specifications') as string || '{}');
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
        category_id,
        inventory_type,
        brand,
        model,
        price,
        in_stock,
        specifications,
        image_url: uploadedUrls[0] || null,
        images: uploadedUrls
      }
    ]);

  if (error) {
    throw new Error(error.message);
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
  const category_id = formData.get('category_id') as string;

  // Get category slug for backward compatibility
  const { data: categoryData } = await supabase
    .from('categories')
    .select('slug')
    .eq('id', category_id)
    .single();
  const category = categoryData?.slug || '';

  const price = parseFloat(formData.get('price') as string);
  const in_stock = formData.get('in_stock') === 'on';
  const inventory_type = formData.get('inventory_type') as string;
  const brand = formData.get('brand') as string;
  const model = formData.get('model') as string;
  const specifications = JSON.parse(formData.get('specifications') as string || '{}');
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
      category_id,
      inventory_type,
      brand,
      model,
      price,
      in_stock,
      specifications,
      image_url: uploadedUrls[0] || null,
      images: uploadedUrls
    })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
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

export async function addQuickCategory(name: string, inventory_type: string) {
  const supabase = await createClient();
  const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const { data, error } = await supabase
    .from('categories')
    .insert([{ 
      name, 
      slug, 
      inventory_type,
      is_featured: false 
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating category:', error);
    return null;
  }

  revalidatePath('/tarusha/dashboard/categories');
  revalidatePath('/tarusha/dashboard/products');
  return data;
}
