import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    await client.query(`
      ALTER TABLE site_settings 
      ADD COLUMN IF NOT EXISTS hero_title text DEFAULT 'The New Experience of Technology',
      ADD COLUMN IF NOT EXISTS hero_subtitle text DEFAULT 'Your trusted partner for high-quality branded computers and professional tech services.',
      ADD COLUMN IF NOT EXISTS hero_video_url text;
    `);
    
    console.log("Successfully added hero columns to site_settings!");
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
