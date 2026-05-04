'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updatePCBuilderGlobalText(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  const { error } = await supabase.from('site_settings').upsert({
    id: 'settings',
    pc_builder_title: title,
    pc_builder_subtitle: description
  }, { onConflict: 'id' });

  if (error) throw new Error(error.message);

  revalidatePath('/tarusha/dashboard/pc-builder');
  revalidatePath('/');
}

export async function addPCSlide(formData: FormData) {
  const supabase = await createClient();
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

export async function togglePCSlide(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const currentStatus = formData.get('currentStatus') === 'true';
  
  await supabase.from('pc_builder_slides').update({ is_active: !currentStatus }).eq('id', id);
  revalidatePath('/tarusha/dashboard/pc-builder');
  revalidatePath('/');
}

export async function updatePCSlide(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const image = formData.get('image') as File;

  let updateData: any = {};

  if (image && image.size > 0) {
    const fileName = `${Date.now()}-${image.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('site-content')
      .upload(fileName, image);

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('site-content')
        .getPublicUrl(fileName);
      updateData.image_url = publicUrl;
    }
  }

  if (Object.keys(updateData).length > 0) {
    await supabase.from('pc_builder_slides')
      .update(updateData)
      .eq('id', id);
  }

  revalidatePath('/tarusha/dashboard/pc-builder');
  revalidatePath('/');
}

