
import pg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function seedProducts() {
  await client.connect();
  console.log('Connected to DB. Fetching categories...');
  
  const { rows: categories } = await client.query('SELECT * FROM categories');
  
  const products = [];

  for (const cat of categories) {
    if (cat.slug === 'gaming-laptops') {
      products.push({
        name: 'ASUS ROG Zephyrus G14',
        brand: 'ASUS',
        model: 'ROG Zephyrus G14',
        price: 450000,
        inventory_type: 'workstations',
        category_id: cat.id,
        specifications: { "CPU": "AMD Ryzen 9", "GPU": "NVIDIA RTX 4060", "RAM": "16GB", "Storage": "1TB SSD" },
        images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800']
      });
      products.push({
        name: 'MSI Katana 15',
        brand: 'MSI',
        model: 'Katana 15',
        price: 320000,
        inventory_type: 'workstations',
        category_id: cat.id,
        specifications: { "CPU": "Intel i7-13th Gen", "GPU": "NVIDIA RTX 4050", "RAM": "16GB", "Storage": "512GB SSD" },
        images: ['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800']
      });
    } else if (cat.slug === 'professional-laptops') {
      products.push({
        name: 'MacBook Pro 14 M3',
        brand: 'Apple',
        model: 'M3 Pro',
        price: 580000,
        inventory_type: 'workstations',
        category_id: cat.id,
        specifications: { "CPU": "Apple M3 Pro", "RAM": "18GB", "Storage": "512GB SSD", "Display": "14-inch Liquid Retina" },
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800']
      });
      products.push({
        name: 'Dell XPS 15',
        brand: 'Dell',
        model: 'XPS 9530',
        price: 495000,
        inventory_type: 'workstations',
        category_id: cat.id,
        specifications: { "CPU": "Intel i9-13th Gen", "RAM": "32GB", "Storage": "1TB SSD", "Display": "OLED Touch" },
        images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800']
      });
    } else if (cat.slug === 'iphone') {
      products.push({
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        model: '15 Pro Max',
        price: 385000,
        inventory_type: 'flagships',
        category_id: cat.id,
        specifications: { "Chip": "A17 Pro", "Camera": "48MP Triple", "Storage": "256GB", "Color": "Natural Titanium" },
        images: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800']
      });
      products.push({
        name: 'iPhone 15',
        brand: 'Apple',
        model: 'iPhone 15',
        price: 245000,
        inventory_type: 'flagships',
        category_id: cat.id,
        specifications: { "Chip": "A16 Bionic", "Camera": "48MP Dual", "Storage": "128GB", "Color": "Blue" },
        images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800']
      });
    } else if (cat.slug === 'samsung-galaxy') {
      products.push({
        name: 'Samsung S24 Ultra',
        brand: 'Samsung',
        model: 'S24 Ultra',
        price: 365000,
        inventory_type: 'flagships',
        category_id: cat.id,
        specifications: { "Chip": "Snapdragon 8 Gen 3", "RAM": "12GB", "Storage": "512GB", "AI": "Galaxy AI" },
        images: ['https://images.unsplash.com/photo-1707246001221-a53f064f77c0?auto=format&fit=crop&q=80&w=800']
      });
      products.push({
        name: 'Samsung Z Fold 5',
        brand: 'Samsung',
        model: 'Fold 5',
        price: 420000,
        inventory_type: 'flagships',
        category_id: cat.id,
        specifications: { "Display": "7.6-inch Foldable", "RAM": "12GB", "Storage": "512GB", "Color": "Icy Blue" },
        images: ['https://images.unsplash.com/photo-1692298711317-0683072e196e?auto=format&fit=crop&q=80&w=800']
      });
    } else if (cat.slug === 'processors') {
      products.push({
        name: 'Intel Core i9-14900K',
        brand: 'Intel',
        model: 'i9-14900K',
        price: 185000,
        inventory_type: 'components',
        category_id: cat.id,
        specifications: { "Cores": "24", "Threads": "32", "Max Clock": "6.0GHz", "Socket": "LGA1700" },
        images: ['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800']
      });
      products.push({
        name: 'AMD Ryzen 7 7800X3D',
        brand: 'AMD',
        model: '7800X3D',
        price: 145000,
        inventory_type: 'components',
        category_id: cat.id,
        specifications: { "Cores": "8", "Threads": "16", "L3 Cache": "96MB", "Socket": "AM5" },
        images: ['https://images.unsplash.com/photo-1555617766-c94804975da3?auto=format&fit=crop&q=80&w=800']
      });
    } else if (cat.slug === 'graphics-cards') {
      products.push({
        name: 'NVIDIA RTX 4090 FE',
        brand: 'NVIDIA',
        model: 'RTX 4090',
        price: 650000,
        inventory_type: 'components',
        category_id: cat.id,
        specifications: { "VRAM": "24GB GDDR6X", "Power": "450W", "Interface": "PCIe 4.0", "DLSS": "3.0 Supported" },
        images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800']
      });
      products.push({
        name: 'ASUS TUF RTX 4070 Ti',
        brand: 'ASUS',
        model: 'RTX 4070 Ti',
        price: 315000,
        inventory_type: 'components',
        category_id: cat.id,
        specifications: { "VRAM": "12GB GDDR6X", "Cooling": "Triple Fan", "Aura Sync": "Yes" },
        images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800']
      });
    }
  }

  console.log(`Seeding ${products.length} products...`);
  
  try {
    for (const p of products) {
      const catSlug = categories.find(c => c.id === p.category_id)?.slug || 'uncategorized';
      await client.query(
        'INSERT INTO products (name, brand, price, inventory_type, category_id, category, specifications, image, in_stock) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [p.name, p.brand, p.price.toString(), p.inventory_type, p.category_id, catSlug, JSON.stringify(p.specifications), p.images[0], true]
      );
      console.log(`  Inserted product: ${p.name}`);
    }
    console.log('Product seeding completed successfully.');
  } catch (err: any) {
    console.error('Error seeding products:', err.message);
  } finally {
    await client.end();
  }
}

seedProducts();
