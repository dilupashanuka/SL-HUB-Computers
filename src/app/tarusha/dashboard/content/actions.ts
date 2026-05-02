'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSiteContent(formData: FormData) {
  const supabase = await createClient();
  const page_slug = formData.get('page_slug') as string;
  const contentStr = formData.get('content') as string;
  
  let content;
  try {
    content = JSON.parse(contentStr);
  } catch (e) {
    console.error('Invalid JSON content:', e);
    return { error: 'Invalid content format' };
  }

  const { error } = await supabase
    .from('site_content')
    .upsert({ page_slug, content, updated_at: new Date().toISOString() }, { onConflict: 'page_slug' });

  if (error) {
    console.error('Error updating site content:', error);
    return { error: error.message };
  }

  revalidatePath('/tarusha/dashboard/content');
  revalidatePath(`/${page_slug === 'home' ? '' : page_slug}`);
  return { success: true };
}
