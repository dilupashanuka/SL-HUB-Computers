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
      -- 1. Add parent_id to categories for subcategory support
      ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES categories(id) ON DELETE SET NULL;

      -- 2. Improve products table relationships
      ALTER TABLE products ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
      
      -- Migrate data from category (slug) to category_id
      UPDATE products p SET category_id = c.id FROM categories c WHERE p.category = c.slug AND p.category_id IS NULL;

      -- 2. Create partners table
      CREATE TABLE IF NOT EXISTS partners (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        logo_url TEXT NOT NULL,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 3. Create hero_videos table
      CREATE TABLE IF NOT EXISTS hero_videos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        video_url TEXT NOT NULL,
        title VARCHAR(255),
        subtitle TEXT,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 4. Create hero_sub_posts table
      CREATE TABLE IF NOT EXISTS hero_sub_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        image_url TEXT NOT NULL,
        title VARCHAR(255),
        link_url TEXT,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- 5. Enable RLS and set policies
      ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
      ALTER TABLE hero_videos ENABLE ROW LEVEL SECURITY;
      ALTER TABLE hero_sub_posts ENABLE ROW LEVEL SECURITY;

      -- Helper for Public Read Access
      DO $$ 
      DECLARE 
        t TEXT;
      BEGIN 
        FOR t IN SELECT unnest(ARRAY['partners', 'hero_videos', 'hero_sub_posts'])
        LOOP
          EXECUTE format('DROP POLICY IF EXISTS "Public Read Access" ON %I', t);
          EXECUTE format('CREATE POLICY "Public Read Access" ON %I FOR SELECT USING (true)', t);
          
          EXECUTE format('DROP POLICY IF EXISTS "Admin Full Access" ON %I', t);
          EXECUTE format('CREATE POLICY "Admin Full Access" ON %I FOR ALL USING (auth.role() = ''authenticated'')', t);
        END LOOP;
      END $$;

      -- Add storage buckets if they don't exist
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('partners', 'partners', true)
      ON CONFLICT (id) DO NOTHING;

      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('hero-videos', 'hero-videos', true)
      ON CONFLICT (id) DO NOTHING;

      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('hero-sub-posts', 'hero-sub-posts', true)
      ON CONFLICT (id) DO NOTHING;

      -- Storage policies for new buckets
      DROP POLICY IF EXISTS "Public Read Partners" ON storage.objects;
      CREATE POLICY "Public Read Partners" ON storage.objects FOR SELECT USING (bucket_id = 'partners');
      
      DROP POLICY IF EXISTS "Admin Upload Partners" ON storage.objects;
      CREATE POLICY "Admin Upload Partners" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'partners' AND auth.role() = 'authenticated');
      
      DROP POLICY IF EXISTS "Public Read Hero Videos" ON storage.objects;
      CREATE POLICY "Public Read Hero Videos" ON storage.objects FOR SELECT USING (bucket_id = 'hero-videos');
      
      DROP POLICY IF EXISTS "Admin Upload Hero Videos" ON storage.objects;
      CREATE POLICY "Admin Upload Hero Videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hero-videos' AND auth.role() = 'authenticated');

      DROP POLICY IF EXISTS "Public Read Hero Sub Posts" ON storage.objects;
      CREATE POLICY "Public Read Hero Sub Posts" ON storage.objects FOR SELECT USING (bucket_id = 'hero-sub-posts');
      
      DROP POLICY IF EXISTS "Admin Upload Hero Sub Posts" ON storage.objects;
      CREATE POLICY "Admin Upload Hero Sub Posts" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hero-sub-posts' AND auth.role() = 'authenticated');
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
