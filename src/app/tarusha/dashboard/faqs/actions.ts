'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createFaq(formData: FormData) {
  const supabase = await createClient()
  
  const question = formData.get('question') as string
  const answer = formData.get('answer') as string

  await supabase.from('faqs').insert({
    question,
    answer,
  })

  revalidatePath('/tarusha/dashboard/faqs')
  redirect('/tarusha/dashboard/faqs')
}

export async function deleteFaq(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('faqs').delete().eq('id', id)

  revalidatePath('/tarusha/dashboard/faqs')
}
