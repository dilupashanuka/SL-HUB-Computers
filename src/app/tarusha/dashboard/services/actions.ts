'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createService(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const icon = formData.get('icon') as string
  const price_range = formData.get('price_range') as string

  await supabase.from('services').insert({
    title,
    description,
    icon,
    price_range
  })

  revalidatePath('/tarusha/dashboard/services')
  revalidatePath('/services')
  redirect('/tarusha/dashboard/services')
}

export async function deleteService(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('services').delete().eq('id', id)

  revalidatePath('/tarusha/dashboard/services')
  revalidatePath('/services')
}
