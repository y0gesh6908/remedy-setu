import express from 'express';
import { Product } from '../models/Product.js';
import { initialProducts } from '../data/products.js';
import { isDbConnected } from '../config/db.js';

const router = express.Router();

// GET all products with filtering & search
router.get('/', async (req, res) => {
  try {
    const { category, concern, search } = req.query;

    let products;

    if (isDbConnected()) {
      const query = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      if (concern && concern !== 'all') {
        query.concerns = concern;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { nameHi: { $regex: search, $options: 'i' } },
          { rulingPlanet: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      products = await Product.find(query).sort({ category: 1, price: 1 });
    } else {
      // In-memory fallback
      products = [...initialProducts];
      if (category && category !== 'all') {
        products = products.filter(p => p.category === category);
      }
      if (concern && concern !== 'all') {
        products = products.filter(p => p.concerns.includes(concern));
      }
      if (search) {
        const s = search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(s) ||
          p.nameHi.toLowerCase().includes(s) ||
          p.rulingPlanet.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s)
        );
      }
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET product by SKU
router.get('/:sku', async (req, res) => {
  try {
    const { sku } = req.params;
    let product;

    if (isDbConnected()) {
      product = await Product.findOne({ sku });
    } else {
      product = initialProducts.find(p => p.sku === sku);
    }

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found in catalogue' });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST seed products manually
router.post('/seed', async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        message: 'Operating in in-memory mode. All 20 catalogue products are preloaded.',
        count: initialProducts.length
      });
    }

    await Product.deleteMany({});
    await Product.insertMany(initialProducts);

    res.json({
      success: true,
      message: `Successfully seeded ${initialProducts.length} products into MongoDB!`,
      count: initialProducts.length
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
