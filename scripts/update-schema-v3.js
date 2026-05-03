import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DIRECT_URL,
});

async function updateSchema() {
  try {
    await client.connect();
    console.log('Connected to the database');

    const query = `
      -- 1. Add image_url and description to categories
      ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url TEXT;
      ALTER TABLE categories ADD COLUMN IF NOT EXISTS description TEXT;
      ALTER TABLE categories ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

      -- 2. Create site_settings table if not exists (for PC builder image, social links)
      CREATE TABLE IF NOT EXISTS site_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        pc_builder_image TEXT,
        facebook_url TEXT,
        instagram_url TEXT,
        tiktok_url TEXT,
        youtube_url TEXT,
        site_name VARCHAR(255) DEFAULT 'SL HUB COMPUTER',
        phone_number VARCHAR(255) DEFAULT '071 067 8944',
        address TEXT DEFAULT 'Deiyandara, Sri Lanka',
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Enable RLS on site_settings
      ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Public Read Site Settings" ON site_settings;
      CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT USING (true);
      
      DROP POLICY IF EXISTS "Admin Full Access Site Settings" ON site_settings;
      CREATE POLICY "Admin Full Access Site Settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

      -- Insert default site settings if empty
      INSERT INTO site_settings (site_name)
      SELECT 'SL HUB COMPUTER'
      WHERE NOT EXISTS (SELECT 1 FROM site_settings);

      -- Storage bucket for categories
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('categories', 'categories', true)
      ON CONFLICT (id) DO NOTHING;

      DROP POLICY IF EXISTS "Public Read Categories Storage" ON storage.objects;
      CREATE POLICY "Public Read Categories Storage" ON storage.objects FOR SELECT USING (bucket_id = 'categories');
      
      DROP POLICY IF EXISTS "Admin Upload Categories Storage" ON storage.objects;
      CREATE POLICY "Admin Upload Categories Storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'categories' AND auth.role() = 'authenticated');

      -- Storage bucket for site_settings
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('site-settings', 'site-settings', true)
      ON CONFLICT (id) DO NOTHING;

      DROP POLICY IF EXISTS "Public Read Site Settings Storage" ON storage.objects;
      CREATE POLICY "Public Read Site Settings Storage" ON storage.objects FOR SELECT USING (bucket_id = 'site-settings');
      
      DROP POLICY IF EXISTS "Admin Upload Site Settings Storage" ON storage.objects;
      CREATE POLICY "Admin Upload Site Settings Storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-settings' AND auth.role() = 'authenticated');
    `;

    await client.query(query);
    console.log('Schema updated successfully!');

  } catch (err) {
    console.error('Error updating schema:', err);
  } finally {
    await client.end();
  }
}

updateSchema();
