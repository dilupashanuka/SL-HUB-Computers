'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPCBuild(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const badge_text = formData.get('badge_text') as string;
  const is_featured = formData.get('is_featured') === 'on';
  const is_active = formData.get('is_active') === 'on';
  const image = formData.get('image') as File | null;

  let image_url = null;
  if (image && image.size > 0) {
    const fileName = `pc-builds/${Date.now()}-${image.name}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from('products')
      .upload(fileName, image);
    if (!uploadError) {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('products')
        .getPublicUrl(fileName);
      image_url = publicUrl;
    }
  }

  const { data: build, error } = await supabase
    .from('pc_builds')
    .insert([{ name, description, category, badge_text, is_featured, is_active, image_url }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/tarusha/dashboard/pc-builds');
  redirect(`/tarusha/dashboard/pc-builds/${build.id}`);
}

export async function updatePCBuild(formData: FormData) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const badge_text = formData.get('badge_text') as string;
  const is_featured = formData.get('is_featured') === 'on';
  const is_active = formData.get('is_active') === 'on';
  const image = formData.get('image') as File | null;
  const existing_image = formData.get('existing_image') as string;

  let image_url = existing_image || null;
  if (image && image.size > 0) {
    const fileName = `pc-builds/${Date.now()}-${image.name}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from('products')
      .upload(fileName, image);
    if (!uploadError) {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('products')
        .getPublicUrl(fileName);
      image_url = publicUrl;
    }
  }

  const { error } = await supabase
    .from('pc_builds')
    .update({ name, description, category, badge_text, is_featured, is_active, image_url, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/tarusha/dashboard/pc-builds');
  revalidatePath('/pc-builder');
  redirect(`/tarusha/dashboard/pc-builds/${id}`);
}

export async function deletePCBuild(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const { error } = await supabase.from('pc_builds').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/tarusha/dashboard/pc-builds');
  revalidatePath('/pc-builder');
}

export async function upsertBuildComponent(formData: FormData) {
  const supabase = await createClient();
  const build_id = formData.get('build_id') as string;
  const component_type = formData.get('component_type') as string;
  const product_id = formData.get('product_id') as string || null;
  const custom_name = formData.get('custom_name') as string || null;
  const custom_price = parseInt(formData.get('custom_price') as string || '0');
  const quantity = parseInt(formData.get('quantity') as string || '1');

  // Remove existing component of same type for this build (one per type)
  await supabase
    .from('pc_build_components')
    .delete()
    .eq('build_id', build_id)
    .eq('component_type', component_type);

  const { error } = await supabase
    .from('pc_build_components')
    .insert([{ build_id, component_type, product_id, custom_name, custom_price, quantity }]);

  if (error) throw new Error(error.message);
  revalidatePath(`/tarusha/dashboard/pc-builds/${build_id}`);
  revalidatePath('/pc-builder');
}

export async function removeBuildComponent(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const build_id = formData.get('build_id') as string;
  await supabase.from('pc_build_components').delete().eq('id', id);
  revalidatePath(`/tarusha/dashboard/pc-builds/${build_id}`);
  revalidatePath('/pc-builder');
}

export async function toggleBuildFeatured(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const is_featured = formData.get('is_featured') === 'true';
  await supabase.from('pc_builds').update({ is_featured: !is_featured }).eq('id', id);
  revalidatePath('/tarusha/dashboard/pc-builds');
  revalidatePath('/pc-builder');
}

export async function upsertComponentMapping(formData: FormData) {
  const supabase = await createClient();
  const component_type = formData.get('component_type') as string;
  const category_id = formData.get('category_id') as string || null;

  const { error } = await supabase
    .from('pc_component_type_categories')
    .upsert(
      { component_type, category_id: category_id || null, updated_at: new Date().toISOString() },
      { onConflict: 'component_type' }
    );

  if (error) throw new Error(error.message);
  revalidatePath('/tarusha/dashboard/pc-builds/mapping');
  revalidatePath('/pc-builder');
}
