import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, isDbConnected } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import remedyRoutes from './routes/remedyRoutes.js';
import { initialProducts } from './data/products.js';
import { Product } from './models/Product.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/remedies', remedyRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Remedy Setu AI Assistant Backend',
    database: isDbConnected() ? 'MongoDB Connected' : 'In-Memory Mode (Preloaded with 20 items)',
    productsCount: initialProducts.length,
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'),
    timestamp: new Date().toISOString()
  });
});

// Seed endpoint convenience
app.get('/api/seed', async (req, res) => {
  try {
    if (isDbConnected()) {
      await Product.deleteMany({});
      await Product.insertMany(initialProducts);
      return res.json({ success: true, message: `Successfully seeded ${initialProducts.length} items to MongoDB.` });
    }
    res.json({ success: true, message: `In-memory mode active. ${initialProducts.length} items loaded.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- PRODUCTION: Serve React build ---
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// All non-API routes → React's index.html (SPA client-side routing)
app.get('*', (req, res) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  // Check if the built file exists (production), otherwise show API welcome
  import('fs').then(fs => {
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.send(`
        <html>
          <head><title>Remedy Setu API</title></head>
          <body style="font-family: sans-serif; padding: 40px; background: #FBF9F5; color: #1e293b;">
            <h1 style="color: #d97706;">🕉️ Remedy Setu - AI Remedy Assistant API</h1>
            <p>Backend is running. Build the React client for the full UI.</p>
            <ul>
              <li><strong>API Health:</strong> <a href="/api/health">/api/health</a></li>
              <li><strong>Product Catalogue:</strong> <a href="/api/products">/api/products</a></li>
              <li><strong>Seed MongoDB:</strong> <a href="/api/seed">/api/seed</a></li>
            </ul>
          </body>
        </html>
      `);
    }
  });
});

// Connect to MongoDB and start server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Remedy Setu Backend running on port ${PORT}`);
    console.log(`🕉️ Serving 20 authentic Vedic products`);
    console.log(`🔒 Guardrail: AI only recommends strictly from catalogue`);
    console.log(`📂 Static files from: ${clientDistPath}`);
    console.log(`=======================================================`);
  });
}

startServer();
