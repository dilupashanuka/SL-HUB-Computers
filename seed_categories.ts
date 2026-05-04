
import pg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const categories = [
  // Workstations
  { name: 'Laptops', slug: 'laptops', inventory_type: 'workstations', description: 'High-performance laptops for all needs.' },
  { name: 'Gaming Laptops', slug: 'gaming-laptops', inventory_type: 'workstations', parent_slug: 'laptops' },
  { name: 'Professional Laptops', slug: 'professional-laptops', inventory_type: 'workstations', parent_slug: 'laptops' },
  { name: 'Desktops', slug: 'desktops', inventory_type: 'workstations', description: 'Powerful desktop solutions.' },
  { name: 'Gaming PCs', slug: 'gaming-pcs', inventory_type: 'workstations', parent_slug: 'desktops' },
  
  // Flagships
  { name: 'Smartphones', slug: 'smartphones', inventory_type: 'flagships', description: 'Latest flagship mobile devices.' },
  { name: 'iPhone', slug: 'iphone', inventory_type: 'flagships', parent_slug: 'smartphones' },
  { name: 'Samsung Galaxy', slug: 'samsung-galaxy', inventory_type: 'flagships', parent_slug: 'smartphones' },
  { name: 'Tablets', slug: 'tablets', inventory_type: 'flagships', description: 'Next-gen tablets and iPads.' },
  { name: 'iPad', slug: 'ipad', inventory_type: 'flagships', parent_slug: 'tablets' },

  // Components
  { name: 'Processors', slug: 'processors', inventory_type: 'components', description: 'The brain of your computer.' },
  { name: 'Graphics Cards', slug: 'graphics-cards', inventory_type: 'components', description: 'Visual performance boosters.' },
  { name: 'Motherboards', slug: 'motherboards', inventory_type: 'components', description: 'The foundation of your build.' },
  { name: 'RAM', slug: 'ram', inventory_type: 'components', description: 'Fast memory for multitasking.' },
  { name: 'Storage', slug: 'storage', inventory_type: 'components', description: 'High-speed SSDs and HDDs.' }
];

async function seedCategories() {
  await client.connect();
  console.log('Connected to DB. Seeding categories...');
  
  try {
    // First, insert top-level categories
    const topLevel = categories.filter(c => !c.parent_slug);
    for (const cat of topLevel) {
      const res = await client.query(
        'INSERT INTO categories (name, slug, inventory_type, description) VALUES ($1, $2, $3, $4) ON CONFLICT (slug) DO UPDATE SET name = $1 RETURNING id',
        [cat.name, cat.slug, cat.inventory_type, cat.description]
      );
      
      const parentId = res.rows[0].id;
      console.log(`Inserted/Updated category: ${cat.name}`);
      
      // Now insert children
      const children = categories.filter(c => c.parent_slug === cat.slug);
      for (const child of children) {
        await client.query(
          'INSERT INTO categories (name, slug, inventory_type, parent_id) VALUES ($1, $2, $3, $4) ON CONFLICT (slug) DO NOTHING',
          [child.name, child.slug, child.inventory_type, parentId]
        );
        console.log(`  Inserted sub-category: ${child.name}`);
      }
    }
    console.log('Seeding completed successfully.');
  } catch (err: any) {
    console.error('Error seeding categories:', err.message);
  } finally {
    await client.end();
  }
}

seedCategories();
