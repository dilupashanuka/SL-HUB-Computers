'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getSiteConfig() {
  const supabase = await createClient();
  const { data } = await supabase.from('site_config').select('*').limit(1).single();
  
  return data || {};
}

export async function updateSiteConfig(formData: FormData) {
  const supabase = await createClient();
  
  const facebook_url = formData.get('facebook_url') as string;
  const tiktok_url = formData.get('tiktok_url') as string;
  const instagram_url = formData.get('instagram_url') as string;
  const youtube_url = formData.get('youtube_url') as string;
  const whatsapp_number = formData.get('whatsapp_number') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;

  const { data: existing } = await supabase.from('site_config').select('id').limit(1).single();

  const configData = {
    facebook_url,
    tiktok_url,
    instagram_url,
    youtube_url,
    whatsapp_number,
    phone,
    email,
    updated_at: new Date().toISOString()
  };

  if (existing) {
    await supabase.from('site_config').update(configData).eq('id', existing.id);
  } else {
    await supabase.from('site_config').insert([configData]);
  }

  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/tarusha/dashboard/config');
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm_password') as string;

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    throw new Error(error.message);
  }
}
