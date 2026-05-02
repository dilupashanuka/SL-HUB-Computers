import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DIRECT_URL,
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');

    const createTablesQuery = `
      -- Create Categories table
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create Products table (Modified for multi-images)
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        price DECIMAL(10, 2),
        image_url TEXT, -- Primary image
        images TEXT[], -- Additional images
        features JSONB,
        in_stock BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create Hero Slides table
      CREATE TABLE IF NOT EXISTS hero_slides (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        image_url TEXT NOT NULL,
        title VARCHAR(255),
        subtitle TEXT,
        button_text VARCHAR(50),
        button_link TEXT,
        "order" INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create Messages table
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create Social Feed table
      CREATE TABLE IF NOT EXISTS social_feed (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        fb_post_url TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'facebook',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create Site Content table
      CREATE TABLE IF NOT EXISTS site_content (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        page_slug VARCHAR(100) UNIQUE NOT NULL,
        content JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create Site Config table
      CREATE TABLE IF NOT EXISTS site_config (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        facebook_url TEXT,
        tiktok_url TEXT,
        instagram_url TEXT,
        youtube_url TEXT,
        whatsapp_number TEXT,
        phone TEXT,
        email TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create Services table
      CREATE TABLE IF NOT EXISTS services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(50),
        price_range VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create FAQs table
      CREATE TABLE IF NOT EXISTS faqs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create Reviews table
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_name VARCHAR(255) NOT NULL,
        review_text TEXT NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        avatar_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Set up Row Level Security (RLS)
      ALTER TABLE products ENABLE ROW LEVEL SECURITY;
      ALTER TABLE services ENABLE ROW LEVEL SECURITY;
      ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
      ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
      ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
      ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
      ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
      ALTER TABLE social_feed ENABLE ROW LEVEL SECURITY;
      ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
      ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

      -- Helper for Public Read Access
      DO $$ 
      DECLARE 
        t TEXT;
      BEGIN 
        FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' 
        LOOP
          EXECUTE format('DROP POLICY IF EXISTS "Public Read Access" ON %I', t);
          EXECUTE format('CREATE POLICY "Public Read Access" ON %I FOR SELECT USING (true)', t);
          
          EXECUTE format('DROP POLICY IF EXISTS "Admin Full Access" ON %I', t);
          EXECUTE format('CREATE POLICY "Admin Full Access" ON %I FOR ALL USING (auth.role() = ''authenticated'')', t);
        END LOOP;
      END $$;

      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('products', 'products', true)
      ON CONFLICT (id) DO NOTHING;

      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('hero', 'hero', true)
      ON CONFLICT (id) DO NOTHING;

      -- Set up Storage Policies
      -- Allow public access to all objects
      CREATE POLICY "Public Read" ON storage.objects FOR SELECT USING (true);
      
      -- Allow authenticated users to upload to products bucket
      CREATE POLICY "Admin Upload Products" ON storage.objects FOR INSERT 
      WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');
      
      -- Allow authenticated users to upload to hero bucket
      CREATE POLICY "Admin Upload Hero" ON storage.objects FOR INSERT 
      WITH CHECK (bucket_id = 'hero' AND auth.role() = 'authenticated');

      -- Allow authenticated users to delete
      CREATE POLICY "Admin Delete Objects" ON storage.objects FOR DELETE 
      USING (auth.role() = 'authenticated');
    `;

    await client.query(createTablesQuery);
    console.log('Database tables and policies created successfully!');

  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await client.end();
  }
}

setupDatabase();
