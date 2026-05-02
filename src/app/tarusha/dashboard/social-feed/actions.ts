'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addSocialPost(formData: FormData) {
  const supabase = await createClient();
  const fb_post_url = formData.get('fb_post_url') as string;

  const { error } = await supabase
    .from('social_feed')
    .insert([{ fb_post_url }]);

  revalidatePath('/tarusha/dashboard/social-feed');
}

export async function deleteSocialPost(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  const { error } = await supabase
    .from('social_feed')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/social-feed');
}
