'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function upsertService(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const icon = formData.get('icon') as string;
  const price_range = formData.get('price_range') as string;

  const data = {
    title,
    description,
    icon: icon || 'settings',
    price_range: price_range || null,
  };

  try {
    if (id) {
      const { error } = await supabase
        .from('services')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('services')
        .insert(data);
      if (error) throw error;
    }

    revalidatePath('/services');
    revalidatePath('/tarusha/dashboard/services');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteService(id: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
      
    if (error) throw error;

    revalidatePath('/services');
    revalidatePath('/tarusha/dashboard/services');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
