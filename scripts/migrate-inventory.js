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
    
    // Create the enum type if it doesn't exist (optional, but using text is safer for future-proofing if they want to add more later. We'll use text to be safe).
    
    // Add inventory_type to categories
    await client.query(`
      ALTER TABLE categories 
      ADD COLUMN IF NOT EXISTS inventory_type VARCHAR(50);
    `);
    
    // Update existing categories to a default to prevent errors
    await client.query(`
      UPDATE categories SET inventory_type = 'workstations' WHERE inventory_type IS NULL;
    `);

    // Add inventory_type to products
    await client.query(`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS inventory_type VARCHAR(50);
    `);
    
    // Update existing products
    await client.query(`
      UPDATE products SET inventory_type = 'workstations' WHERE inventory_type IS NULL;
    `);

    console.log("Migration completed successfully!");
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
