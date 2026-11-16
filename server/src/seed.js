import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { initialProducts } from './data/products.js';
import { Product } from './models/Product.js';

dotenv.config();

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/remedy_setu';
  try {
    console.log(`Connecting to MongoDB at: ${uri}`);
    await mongoose.connect(uri);
    console.log('Connected.');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const inserted = await Product.insertMany(initialProducts);
    console.log(`Successfully seeded ${inserted.length} Remedy Setu catalogue products!`);

    await mongoose.disconnect();
    console.log('Disconnected. Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
