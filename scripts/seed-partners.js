const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function seedPartners() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const partners = [
      { name: 'Intel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/2560px-Intel-logo.svg.png' },
      { name: 'Nvidia', logo: 'https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/1280px-Nvidia_logo.svg.png' },
      { name: 'Asus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Asus_Logo.svg/2560px-Asus_Logo.svg.png' },
      { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1665px-Apple_logo_black.svg.png' },
      { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png' },
      { name: 'MSI', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/MSI_Logo.svg/2560px-MSI_Logo.svg.png' },
      { name: 'Corsair', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Corsair_Components_logo.svg/1200px-Corsair_Components_logo.svg.png' },
      { name: 'Logitech', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Logitech_logo.svg/2560px-Logitech_logo.svg.png' },
      { name: 'Razer', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Razer_snake_logo.svg/1200px-Razer_snake_logo.svg.png' },
      { name: 'Gigabyte', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Gigabyte_Technology_logo.svg/2560px-Gigabyte_Technology_logo.svg.png' },
      { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png' },
      { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/2560px-Dell_logo_2016.svg.png' }
    ];

    for (const partner of partners) {
      const query = 'INSERT INTO partners (name, logo_url) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET logo_url = EXCLUDED.logo_url';
      // Note: If there's no unique constraint on 'name', ON CONFLICT might not work.
      // Let's just insert if not exists.
      const check = await client.query('SELECT id FROM partners WHERE name = $1', [partner.name]);
      if (check.rows.length === 0) {
        await client.query('INSERT INTO partners (name, logo_url) VALUES ($1, $2)', [partner.name, partner.logo]);
        console.log(`Added ${partner.name}`);
      } else {
        await client.query('UPDATE partners SET logo_url = $2 WHERE name = $1', [partner.name, partner.logo]);
        console.log(`Updated ${partner.name}`);
      }
    }

    console.log('Seeding completed');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await client.end();
  }
}

seedPartners();
