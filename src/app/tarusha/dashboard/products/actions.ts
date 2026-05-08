'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

interface ProductFormData {
  title: string;
  description: string;
  category_id: string;
  price: string;
  inventory_type: string;
  brand: string;
  model: string;
  specifications: string;
  images: File[];
  in_stock: boolean;
}

function validateProductData(data: ProductFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('නිෂ්පාදන නම අනිවාර්යයි');
  } else if (data.title.length < 3) {
    errors.push('නිෂ්පාදන නම අකුරු 3කට වඩා විය යුතුය');
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.push('විස්තරය අනිවාර්යයි');
  }

  if (!data.category_id) {
    errors.push('ප්‍රවර්ගය තෝරන්න');
  }

  const price = parseFloat(data.price);
  if (isNaN(price) || price <= 0) {
    errors.push('වලංගු මිලක් ඇතුළත් කරන්න');
  }

  if (!data.inventory_type) {
    errors.push('ගබඩා වර්ගය තෝරන්න');
  }

  if (!data.brand || data.brand.trim().length === 0) {
    errors.push('බ්‍රෑන්ඩ් නම අනිවාර්යයි');
  }

  try {
    if (data.specifications) {
      JSON.parse(data.specifications);
    }
  } catch (e) {
    errors.push('දත්ත විශේෂණ වලංගු නොවේ (Invalid JSON)');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category_id = formData.get('category_id') as string;
  const price = formData.get('price') as string;
  const in_stock = formData.get('in_stock') === 'on';
  const inventory_type = formData.get('inventory_type') as string;
  const brand = formData.get('brand') as string;
  const model = formData.get('model') as string;
  const specifications = formData.get('specifications') as string || '{}';
  const images = formData.getAll('images') as File[];

  // Validate data
  const validation = validateProductData({
    title,
    description,
    category_id,
    price,
    inventory_type,
    brand,
    model,
    specifications,
    images,
    in_stock
  });

  if (!validation.valid) {
    return {
      success: false,
      error: validation.errors.join(', ')
    };
  }

  // Get category slug for backward compatibility
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('slug')
    .eq('id', category_id)
    .single();

  if (categoryError || !categoryData) {
    return {
      success: false,
      error: 'ප්‍රවර්ගය සොයාගත නොහැක'
    };
  }

  const category = categoryData.slug;
  const numericPrice = parseFloat(price);

  const uploadedUrls: string[] = [];

  for (const image of images) {
    if (!image || image.size === 0) continue;

    // Validate image type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(image.type)) {
      return {
        success: false,
        error: 'රූපය JPEG, PNG හෝ WebP ආකාරයෙන් තිබිය යුතුය'
      };
    }

    // Validate image size (max 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return {
        success: false,
        error: 'රූපය 5MB ට වඩා විශාල විය නොහැක'
      };
    }

    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('products')
      .upload(filePath, image, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return {
        success: false,
        error: `රූපය උඩුගත කිරීමට අසමත් විය: ${uploadError.message}`
      };
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('products')
      .getPublicUrl(filePath);

    uploadedUrls.push(publicUrl);
  }

  if (uploadedUrls.length === 0) {
    return {
      success: false,
      error: 'අවම වශයෙන් රූපයක්වත් උඩුගත කරන්න'
    };
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
        price: numericPrice,
        in_stock,
        specifications: JSON.parse(specifications),
        image_url: uploadedUrls[0],
        images: uploadedUrls
      }
    ]);

  if (error) {
    console.error('Database error:', error);
    return {
      success: false,
      error: `දත්ත ගබඩාවට එකතු කිරීමට අසමත් විය: ${error.message}`
    };
  }

  revalidatePath('/tarusha/dashboard/products');
  
  return {
    success: true,
    message: 'නිෂ්පාදනය සාර්ථකව එකතු කරන ලදී'
  };
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category_id = formData.get('category_id') as string;
  const price = formData.get('price') as string;
  const in_stock = formData.get('in_stock') === 'on';
  const inventory_type = formData.get('inventory_type') as string;
  const brand = formData.get('brand') as string;
  const model = formData.get('model') as string;
  const specifications = formData.get('specifications') as string || '{}';
  const newImages = formData.getAll('images') as File[];
  const existingImages = JSON.parse(formData.get('existing_images') as string || '[]');

  // Validate data
  const validation = validateProductData({
    title,
    description,
    category_id,
    price,
    inventory_type,
    brand,
    model,
    specifications,
    images: newImages,
    in_stock
  });

  if (!validation.valid) {
    return {
      success: false,
      error: validation.errors.join(', ')
    };
  }

  // Get category slug for backward compatibility
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('slug')
    .eq('id', category_id)
    .single();

  if (categoryError || !categoryData) {
    return {
      success: false,
      error: 'ප්‍රවර්ගය සොයාගත නොහැක'
    };
  }

  const category = categoryData.slug;
  const numericPrice = parseFloat(price);

  const uploadedUrls: string[] = [...existingImages];

  for (const image of newImages) {
    if (!image || image.size === 0) continue;

    // Validate image type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(image.type)) {
      return {
        success: false,
        error: 'රූපය JPEG, PNG හෝ WebP ආකාරයෙන් තිබිය යුතුය'
      };
    }

    // Validate image size (max 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return {
        success: false,
        error: 'රූපය 5MB ට වඩා විශාල විය නොහැක'
      };
    }

    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('products')
      .upload(filePath, image, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return {
        success: false,
        error: `රූපය උඩුගත කිරීමට අසමත් විය: ${uploadError.message}`
      };
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
      price: numericPrice,
      in_stock,
      specifications: JSON.parse(specifications),
      image_url: uploadedUrls[0] || null,
      images: uploadedUrls
    })
    .eq('id', id);

  if (error) {
    console.error('Database error:', error);
    return {
      success: false,
      error: `දත්ත ගබඩාව යාවත්කාලීන කිරීමට අසමත් විය: ${error.message}`
    };
  }

  revalidatePath('/tarusha/dashboard/products');
  
  return {
    success: true,
    message: 'නිෂ්පාදනය සාර්ථකව යාවත්කාලීන කරන ලදී'
  };
}

export async function deleteProduct(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  if (!id) {
    return {
      success: false,
      error: 'නිෂ්පාදන ID හමු නොවීය'
    };
  }

  // Get product to delete images from storage
  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('images')
    .eq('id', id)
    .single();

  if (fetchError) {
    return {
      success: false,
      error: 'නිෂ්පාදනය සොයාගත නොහැක'
    };
  }

  // Delete images from storage
  if (product?.images && Array.isArray(product.images)) {
    const supabaseAdmin = createAdminClient();
    
    for (const imageUrl of product.images) {
      try {
        // Extract file path from URL
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `product-images/${fileName}`;

        await supabaseAdmin.storage
          .from('products')
          .remove([filePath]);
      } catch (e) {
        console.error('Error deleting image:', e);
        // Continue with other deletions even if one fails
      }
    }
  }

  // Delete the database record
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Database error:', error);
    return {
      success: false,
      error: `නිෂ්පාදනය මැකීමට අසමත් විය: ${error.message}`
    };
  }

  revalidatePath('/tarusha/dashboard/products');
  
  return {
    success: true,
    message: 'නිෂ්පාදනය සාර්ථකව මකන ලදී'
  };
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
