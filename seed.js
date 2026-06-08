require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');
const Shipment = require('./models/Shipment');
const Quote = require('./models/Quote');
const Admin = require('./models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skynet_logistics';

const seedData = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected. Starting seed...\n');

    // Clear existing data
    await Contact.deleteMany({});
    await Shipment.deleteMany({});
    await Quote.deleteMany({});
    await Admin.deleteMany({});
    console.log('🗑️  Cleared existing data.\n');

    // ==========================================
    // Seed Admin User
    // ==========================================
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123',
      displayName: 'Skynet Admin',
      role: 'superadmin'
    });
    console.log('🔐 Seeded admin user:');
    console.log(`   → Username: admin`);
    console.log(`   → Password: admin123`);
    console.log(`   → Role: ${admin.role}\n`);

    // ==========================================
    // Seed Shipments
    // ==========================================
    const shipments = await Shipment.create([
      {
        trackingCode: 'SKY-102948',
        status: 'Delivered',
        origin: 'Hong Kong',
        destination: 'Sydney, Australia',
        events: [
          {
            title: 'Delivered',
            description: 'Signed by: VARUN. Bondi Junction Office - Sydney NSW',
            timestamp: new Date('2026-06-03T10:45:00'),
            isActive: true
          },
          {
            title: 'Out for Delivery',
            description: 'Sydney Local Hub courier driver dispatched',
            timestamp: new Date('2026-06-03T08:30:00'),
            isActive: false
          },
          {
            title: 'Customs Cleared',
            description: 'Sydney Airport border check completed, released',
            timestamp: new Date('2026-06-02T14:15:00'),
            isActive: false
          },
          {
            title: 'Arrived at Destination Country',
            description: 'Sydney Airport International Air Cargo Terminal',
            timestamp: new Date('2026-06-01T11:00:00'),
            isActive: false
          },
          {
            title: 'Departed from Origin Country',
            description: 'Hong Kong International Cargo Hub Terminal 1',
            timestamp: new Date('2026-05-30T16:20:00'),
            isActive: false
          },
          {
            title: 'Shipment Information Received',
            description: 'Shipment data processed, booking confirmed',
            timestamp: new Date('2026-05-29T09:00:00'),
            isActive: false
          }
        ]
      },
      {
        trackingCode: 'SKY-987654',
        status: 'In Transit',
        origin: 'London, United Kingdom',
        destination: 'Melbourne, Australia',
        events: [
          {
            title: 'Arrived at Intermediate Hub',
            description: 'Singapore Cargo Transit Depot',
            timestamp: new Date('2026-06-04T05:40:00'),
            isActive: true
          },
          {
            title: 'Departed Hub',
            description: 'London Heathrow Airport Terminal 4',
            timestamp: new Date('2026-06-03T22:00:00'),
            isActive: false
          },
          {
            title: 'Information Received',
            description: 'Consignment booked, pickup completed at sender warehouse',
            timestamp: new Date('2026-06-02T01:15:00'),
            isActive: false
          }
        ]
      },
      {
        trackingCode: 'SKY-456321',
        status: 'Customs',
        origin: 'Shanghai, China',
        destination: 'Perth, Australia',
        events: [
          {
            title: 'Customs Hold',
            description: 'Awaiting documentation review at Perth customs',
            timestamp: new Date('2026-06-04T09:00:00'),
            isActive: true
          },
          {
            title: 'Arrived at Destination',
            description: 'Perth Airport cargo facility',
            timestamp: new Date('2026-06-03T18:30:00'),
            isActive: false
          },
          {
            title: 'Departed Origin',
            description: 'Shanghai Pudong International Airport',
            timestamp: new Date('2026-06-01T22:00:00'),
            isActive: false
          },
          {
            title: 'Information Received',
            description: 'Booking confirmed at origin warehouse',
            timestamp: new Date('2026-06-01T10:00:00'),
            isActive: false
          }
        ]
      }
    ]);
    console.log(`📦 Seeded ${shipments.length} shipments:`);
    shipments.forEach(s => console.log(`   → ${s.trackingCode} (${s.status})`));

    // ==========================================
    // Seed Contacts
    // ==========================================
    const contacts = await Contact.create([
      {
        fullName: 'Sarah Chen',
        company: 'Pacific Trade Corp',
        email: 'sarah.chen@pacifictrade.com',
        phone: '+61 4 1234 5678',
        message: 'We need a quote for regular FCL shipments from Shanghai to Sydney. Approximately 4-6 containers per month. Please advise.',
        status: 'new'
      },
      {
        fullName: 'James O\'Brien',
        company: 'Melbourne Imports Ltd',
        email: 'j.obrien@melbimports.com.au',
        phone: '+61 3 9876 5432',
        message: 'Interested in your air freight services for time-critical medical supplies from Frankfurt. Need a reliable weekly route.',
        status: 'read'
      }
    ]);
    console.log(`\n📬 Seeded ${contacts.length} contacts:`);
    contacts.forEach(c => console.log(`   → ${c.fullName} (${c.status})`));

    // ==========================================
    // Seed Quotes
    // ==========================================
    const quotes = await Quote.create([
      {
        origin: 'Sydney, Australia',
        destination: 'London, United Kingdom',
        freightType: 'air',
        weight: 250,
        volume: 3.5,
        estimatedCost: 2387.50,
        contactEmail: 'logistics@example.com',
        status: 'pending'
      },
      {
        origin: 'Shanghai, China',
        destination: 'Perth, Australia',
        freightType: 'ocean-fcl',
        weight: 18000,
        volume: 33,
        estimatedCost: 2548.00,
        contactEmail: '',
        status: 'sent'
      }
    ]);
    console.log(`\n💰 Seeded ${quotes.length} quotes:`);
    quotes.forEach(q => console.log(`   → ${q.origin} → ${q.destination} ($${q.estimatedCost})`));

    console.log('\n✅ Database seeding complete!');
    console.log('   Run "npm start" or "npm run dev" to start the server.\n');

  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
};

seedData();
