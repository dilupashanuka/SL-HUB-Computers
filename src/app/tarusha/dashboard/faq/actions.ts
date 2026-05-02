'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addFaq(formData: FormData) {
  const supabase = await createClient();
  const question = formData.get('question') as string;
  const answer = formData.get('answer') as string;
  const category = formData.get('category') as string;

  const { error } = await supabase
    .from('faqs')
    .insert([{ question, answer, category }]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/faq');
}

export async function deleteFaq(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/faq');
}
