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
  const address = formData.get('address') as string;
  const maintenance_mode = formData.get('maintenance_mode') === 'on';
  const logoFile = formData.get('logo') as File;
  
  const facebook_url = formData.get('facebook_url') as string;
  const instagram_url = formData.get('instagram_url') as string;
  const tiktok_url = formData.get('tiktok_url') as string;
  const youtube_url = formData.get('youtube_url') as string;

  let logo_url = undefined;

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

  const updateData: any = {
    site_name,
    whatsapp_number,
    phone_number,
    address,
    maintenance_mode,
    facebook_url,
    instagram_url,
    tiktok_url,
    youtube_url,
    updated_at: new Date().toISOString(),
  };

  if (logo_url) {
    updateData.logo_url = logo_url;
  }

  const { error } = await supabase
    .from('site_settings')
    .update(updateData)
    .eq('id', 1);

  if (error) {
    // If table doesn't exist or row doesn't exist, this might fail.
    // In a real app, we'd handle the initial insert here if update fails.
    console.error('Error updating settings:', error);
    
    // Try insert if update failed (assume it failed because of no row)
    await supabase.from('site_settings').upsert([{ id: 1, ...updateData }]);
  }

  revalidatePath('/tarusha/dashboard/settings');
  revalidatePath('/', 'layout');
}
