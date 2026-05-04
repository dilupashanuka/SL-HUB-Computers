import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing anon read on pc_builds with relations...');
  const { data, error } = await supabase
    .from('pc_builds')
    .select('*, pc_build_components(*, products(id, title, price, image_url, brand))')
    .eq('is_active', true)
    .order('is_featured', { ascending: false });
    
  if (error) {
    console.error('Error:', error);
  } else {
    console.log(`Found ${data.length} active builds`);
    console.log(data);
  }
}

test();
