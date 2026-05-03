import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: existing } = await supabase.from('hero_slides').select('*');
  
  if (!existing || existing.length === 0) {
    const { error } = await supabase.from('hero_slides').insert([{
      title: 'The New Experience of Technology',
      subtitle: 'Your trusted partner for high-quality branded computers and professional tech services.',
      image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop'
    }]);
    
    if (error) {
      console.error("Error inserting hero slide:", error);
    } else {
      console.log("Successfully inserted default hero slide to database!");
    }
  } else {
    console.log("Hero slides already exist in database.");
  }
}

main();
