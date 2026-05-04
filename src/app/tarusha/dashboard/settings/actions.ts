'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const site_name = formData.get('site_name') as string;
  const whatsapp_number = formData.get('whatsapp_number') as string;
  const phone_number = formData.get('phone_number') as string;
  const email = formData.get('email') as string;
  const address = formData.get('address') as string;
  const about_text = formData.get('about_text') as string;
  const maintenance_mode = formData.get('maintenance_mode') === 'on';
  const logoFile = formData.get('logo') as File;
  
  const facebook_url = formData.get('facebook_url') as string;
  const instagram_url = formData.get('instagram_url') as string;
  const tiktok_url = formData.get('tiktok_url') as string;
  const youtube_url = formData.get('youtube_url') as string;
  const twitter_url = formData.get('twitter_url') as string;
  const discord_url = formData.get('discord_url') as string;
  const reddit_url = formData.get('reddit_url') as string;
  const twitch_url = formData.get('twitch_url') as string;
  
  const hero_title = formData.get('hero_title') as string;
  const hero_subtitle = formData.get('hero_subtitle') as string;
  const hero_video_url = formData.get('hero_video_url') as string;
  
  const pcBuilderFile = formData.get('pc_builder_image') as File;

  let logo_url = undefined;
  let pc_builder_image = undefined;

  if (logoFile && logoFile.size > 0) {
    const fileExt = logoFile.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;
    const filePath = `settings/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('hero')
      .upload(filePath, logoFile);

    if (!uploadError) {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('hero')
        .getPublicUrl(filePath);
      logo_url = publicUrl;
    }
  }

  if (pcBuilderFile && pcBuilderFile.size > 0) {
    const fileExt = pcBuilderFile.name.split('.').pop();
    const fileName = `pc-builder-${Date.now()}.${fileExt}`;
    const filePath = `settings/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('site-settings')
      .upload(filePath, pcBuilderFile);

    if (!uploadError) {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('site-settings')
        .getPublicUrl(filePath);
      pc_builder_image = publicUrl;
    }
  }

  const updateData: any = {
    site_name,
    whatsapp_number,
    phone_number,
    email,
    address,
    about_text,
    maintenance_mode,
    facebook_url,
    instagram_url,
    tiktok_url,
    youtube_url,
    twitter_url,
    discord_url,
    reddit_url,
    twitch_url,
    hero_title,
    hero_subtitle,
    hero_video_url,
    updated_at: new Date().toISOString(),
  };

  if (logo_url) {
    updateData.logo_url = logo_url;
  }
  
  if (pc_builder_image) {
    updateData.pc_builder_image = pc_builder_image;
  }

  const { data: existingSettings } = await supabase.from('site_settings').select('id').single();

  if (existingSettings) {
    const { error } = await supabase
      .from('site_settings')
      .update(updateData)
      .eq('id', existingSettings.id);

    if (error) {
      console.error('Error updating settings:', error);
    }
  } else {
    // Try insert if no row exists
    await supabase.from('site_settings').insert([updateData]);
  }

  revalidatePath('/tarusha/dashboard/settings');
  revalidatePath('/', 'layout');
}
