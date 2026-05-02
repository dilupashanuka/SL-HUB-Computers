'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function addReview(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();
  const customer_name = formData.get('customer_name') as string;
  const review_text = formData.get('review_text') as string;
  const rating = parseInt(formData.get('rating') as string);
  const avatar_file = formData.get('avatar') as File;

  let avatar_url = null;

  if (avatar_file && avatar_file.size > 0) {
    const fileExt = avatar_file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('products') // Reuse products bucket or create new one
      .upload(filePath, avatar_file);

    if (!uploadError) {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('products')
        .getPublicUrl(filePath);
      avatar_url = publicUrl;
    }
  }

  const { error } = await supabase
    .from('reviews')
    .insert([{ customer_name, review_text, rating, avatar_url }]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/reviews');
}

export async function deleteReview(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/reviews');
}
