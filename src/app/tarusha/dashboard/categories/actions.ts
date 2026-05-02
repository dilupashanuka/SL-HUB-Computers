'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addCategory(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get('name') as string;
  const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const { error } = await supabase
    .from('categories')
    .insert([{ name, slug }]);

  revalidatePath('/tarusha/dashboard/categories');
}

export async function deleteCategory(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/categories');
}
