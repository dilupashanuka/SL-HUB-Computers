'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function markAsRead(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/messages');
}

export async function deleteMessage(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tarusha/dashboard/messages');
}
