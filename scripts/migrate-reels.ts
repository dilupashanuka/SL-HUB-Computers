import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function migrate() {
  console.log('🚀 Running migration for video_reels table...')
  
  const { error } = await supabase.rpc('execute_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS video_reels (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        video_url TEXT NOT NULL,
        thumbnail_url TEXT,
        category TEXT DEFAULT 'PC Build',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      ALTER TABLE site_settings 
      ADD COLUMN IF NOT EXISTS facebook_url TEXT,
      ADD COLUMN IF NOT EXISTS instagram_url TEXT,
      ADD COLUMN IF NOT EXISTS tiktok_url TEXT,
      ADD COLUMN IF NOT EXISTS youtube_url TEXT;
    `
  })

  if (error) {
    // If RPC is not available, we might need another way or just hope the user runs it.
    // But usually I can use a simple query if I have the role.
    console.error('Migration failed:', error)
  } else {
    console.log('✅ Migration successful!')
  }
}

migrate()
