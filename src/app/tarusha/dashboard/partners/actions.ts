'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addPartner(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get('name') as string;
  const logos = formData.get('logos') as unknown as File[];
  
  if (!logos || (Array.isArray(logos) && logos.length === 0)) {
    throw new Error("No logos selected");
  }

  const logoFiles = Array.isArray(logos) ? logos : [logos];

  for (const file of logoFiles) {
    if (file.size === 0) continue;
    
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('partners')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Logo upload error:', uploadError);
      continue;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('partners')
      .getPublicUrl(fileName);

    await supabase.from('partners').insert([{
      name: name || file.name.split('.')[0],
      logo_url: publicUrl
    }]);
  }

  revalidatePath('/tarusha/dashboard/partners');
  revalidatePath('/');
}

export async function deletePartner(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const logoUrl = formData.get('logo_url') as string;

  if (logoUrl) {
    const fileName = logoUrl.split('/').pop();
    if (fileName) {
      await supabase.storage.from('partners').remove([fileName]);
    }
  }

  await supabase.from('partners').delete().eq('id', id);

  revalidatePath('/tarusha/dashboard/partners');
  revalidatePath('/');
}
