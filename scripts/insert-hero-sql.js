import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  if (!process.env.DIRECT_URL) {
    console.error("Missing DIRECT_URL in .env.local");
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DIRECT_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    // Check if there are any existing slides
    const res = await client.query('SELECT count(*) FROM hero_slides');
    if (parseInt(res.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO hero_slides (title, subtitle, image_url) 
        VALUES (
          'The New Experience of Technology',
          'Your trusted partner for high-quality branded computers and professional tech services.',
          'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop'
        )
      `);
      console.log("Successfully inserted default hero slide to database!");
    } else {
      console.log("Hero slides already exist in database.");
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
