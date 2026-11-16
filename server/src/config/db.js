import mongoose from 'mongoose';
import { initialProducts } from '../data/products.js';
import { Product } from '../models/Product.js';

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/remedy_setu';
  
  try {
    // Attempt connection with short timeout so we don't hang if local mongod isn't started
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${uri}`);

    // Auto-seed catalogue if empty
    await autoSeedProducts();
  } catch (err) {
    console.warn(`[MongoDB] Could not connect to local MongoDB (${err.message}).`);
    console.warn(`[MongoDB] Operating in High-Performance In-Memory Mode with preloaded Remedy Setu Catalogue.`);
    isConnected = false;
  }
}

export function isDbConnected() {
  return isConnected;
}

export async function autoSeedProducts() {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('[MongoDB] Product catalogue is empty. Seeding initial 20 Remedy Setu products...');
      await Product.insertMany(initialProducts);
      console.log(`[MongoDB] Successfully seeded ${initialProducts.length} authentic products.`);
    } else {
      console.log(`[MongoDB] Product catalogue already contains ${count} items.`);
    }
  } catch (err) {
    console.error('[MongoDB] Error during auto-seeding:', err.message);
  }
}
