'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function updateHeroGlobalText(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const video_url = formData.get('video_url') as string;

  const { data: existingSettings } = await supabase.from('site_settings').select('id').single();
  
  const { error } = await supabase.from('site_settings').upsert({
    id: existingSettings?.id || 'settings', 
    hero_title: title,
    hero_subtitle: subtitle,
    hero_video_url: video_url
  }, { onConflict: 'id' });

  if (error) throw new Error(error.message);

  revalidatePath('/tarusha/dashboard/hero');
  revalidatePath('/');
}

export async function uploadHeroSlides(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();
  const images = formData.getAll('images') as File[];

  for (const image of images) {
    if (image.size === 0) continue;

    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `hero-slides/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('hero')
      .upload(filePath, image);

    if (uploadError) {
      console.error('Error uploading hero image:', uploadError);
      continue;
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('hero')
      .getPublicUrl(filePath);

    // Insert into DB without slide-specific text
    await supabase
      .from('hero_slides')
      .insert([{ 
        image_url: publicUrl
      }]);
  }

  revalidatePath('/tarusha/dashboard/hero');
  revalidatePath('/');
}

export async function deleteHeroSlide(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();
  const id = formData.get('id') as string;
  const imageUrl = formData.get('imageUrl') as string;

  // Delete from DB
  const { error } = await supabase
    .from('hero_slides')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  // Optional: Delete from storage
  if (imageUrl) {
    const path = imageUrl.split('/').pop();
    if (path) {
      await supabaseAdmin.storage
        .from('hero')
        .remove([`hero-slides/${path}`]);
    }
  }

  revalidatePath('/tarusha/dashboard/hero');
  revalidatePath('/');
}

export async function updateHeroSlide(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();
  const id = formData.get('id') as string;
  const video_url = formData.get('video_url') as string;
  const image = formData.get('image') as File;

  let updateData: any = { video_url };

  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `hero-slides/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('hero')
      .upload(filePath, image);

    if (!uploadError) {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('hero')
        .getPublicUrl(filePath);
      updateData.image_url = publicUrl;
    }
  }

  const { error } = await supabase
    .from('hero_slides')
    .update(updateData)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/hero');
  revalidatePath('/');
}

