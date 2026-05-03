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
    
    let res = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products';");
    console.log("PRODUCTS TABLE:", res.rows);
    
    res = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'categories';");
    console.log("CATEGORIES TABLE:", res.rows);
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
