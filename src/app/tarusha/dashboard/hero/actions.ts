'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

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

    // Insert into DB
    await supabase
      .from('hero_slides')
      .insert([{ 
        image_url: publicUrl,
        title: 'SL HUB COMPUTER',
        subtitle: 'The New Experience of Technology'
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
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const video_url = formData.get('video_url') as string;

  const { error } = await supabase
    .from('hero_slides')
    .update({ title, subtitle, video_url })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/hero');
  revalidatePath('/');
}
