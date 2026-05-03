const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function setupPCBuilderTable() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS pc_builder_slides (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Check if empty and add default
    const check = await client.query('SELECT id FROM pc_builder_slides LIMIT 1');
    if (check.rows.length === 0) {
      await client.query(`
        INSERT INTO pc_builder_slides (title, description, image_url)
        VALUES ($1, $2, $3)
      `, [
        'Build Your Masterpiece',
        'Select from thousands of premium parts. Our system checks compatibility automatically.',
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1974&auto=format&fit=crop'
      ]);
      console.log('Added default PC builder slide');
    }

    console.log('Database setup completed');
  } catch (err) {
    console.error('Setup error:', err);
  } finally {
    await client.end();
  }
}

setupPCBuilderTable();
