'use server';

import { createClient } from '@/utils/supabase/server';

export async function submitContactMessage(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  try {
    const { error } = await supabase.from('messages').insert({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      is_read: false,
    });

    if (error) {
      console.error('Error inserting message:', error);
      return { success: false, error: 'Failed to send message. Please try again later.' };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
