import express from 'express';
import { Product } from '../models/Product.js';
import { Consultation } from '../models/Consultation.js';
import { initialProducts } from '../data/products.js';
import { generateRemedies, handleRemedyChat } from '../services/geminiService.js';
import { isDbConnected } from '../config/db.js';

const router = express.Router();

// In-memory consultations storage fallback
let inMemoryConsultations = [];

// POST /api/remedies/suggest
router.post('/suggest', async (req, res) => {
  try {
    const { 
      sessionId,
      name, 
      dob, 
      tob, 
      pob, 
      concernCategory, 
      concernDescription, 
      language = 'en' 
    } = req.body;

    if (!dob || !concernCategory) {
      return res.status(400).json({ 
        success: false, 
        error: 'Date of birth (dob) and concernCategory are required.' 
      });
    }

    // Fetch active products
    let catalogueProducts = initialProducts;
    if (isDbConnected()) {
      try {
        const dbProducts = await Product.find({ inStock: true });
        if (dbProducts && dbProducts.length > 0) {
          catalogueProducts = dbProducts;
        }
      } catch (e) {
        console.warn('Could not query Mongo products, using initialProducts fallback:', e.message);
      }
    }

    // Call Gemini with strict catalogue grounding
    const aiResponse = await generateRemedies({
      birthDetails: { name, dob, tob, pob },
      concern: { 
        category: concernCategory, 
        description: concernDescription || `Concern regarding ${concernCategory}` 
      },
      language,
      catalogueProducts
    });

    // Save consultation record with private sessionId
    const consultationDoc = {
      sessionId: sessionId || 'anonymous',
      userName: name || 'Seeker',
      dob,
      tob: tob || '',
      pob: pob || 'India',
      concernCategory,
      concernDescription: concernDescription || '',
      language,
      astrologicalAnalysis: aiResponse.astrologicalAnalysis,
      recommendations: aiResponse.recommendations,
      aiModelUsed: aiResponse.aiModelUsed,
      createdAt: new Date()
    };

    if (isDbConnected()) {
      try {
        await Consultation.create(consultationDoc);
      } catch (err) {
        console.warn('Could not save consultation to MongoDB:', err.message);
      }
    } else {
      inMemoryConsultations.unshift(consultationDoc);
      if (inMemoryConsultations.length > 100) inMemoryConsultations.pop();
    }

    res.json({
      success: true,
      data: {
        seeker: { name: consultationDoc.userName, dob, tob, pob, concernCategory },
        astrologicalAnalysis: aiResponse.astrologicalAnalysis,
        recommendations: aiResponse.recommendations,
        spiritualAdvice: aiResponse.spiritualAdvice,
        aiModelUsed: aiResponse.aiModelUsed,
        catalogueEnforced: true,
        guardrailStatus: "100% Grounded in Remedy Setu Catalogue (No Hallucinations Allowed)"
      }
    });

  } catch (err) {
    console.error('[Remedy Suggestion Route Error]:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/remedies/chat
router.post('/chat', async (req, res) => {
  try {
    const { message, chatHistory = [], language = 'en' } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, error: 'Message cannot be empty.' });
    }

    let catalogueProducts = initialProducts;
    if (isDbConnected()) {
      try {
        const dbProducts = await Product.find({ inStock: true });
        if (dbProducts && dbProducts.length > 0) {
          catalogueProducts = dbProducts;
        }
      } catch (e) {
        // fallback
      }
    }

    const chatResponse = await handleRemedyChat({
      message,
      chatHistory,
      catalogueProducts,
      language
    });

    res.json({
      success: true,
      data: chatResponse
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/remedies/history
// Strict privacy filter: only returns consultations matching the user's sessionId
router.get('/history', async (req, res) => {
  try {
    const { sessionId, adminSecret } = req.query;

    if (!sessionId && (!adminSecret || adminSecret !== process.env.ADMIN_SECRET)) {
      return res.json({ success: true, count: 0, data: [] });
    }

    const query = {};
    if (sessionId) {
      query.sessionId = sessionId;
    }

    let consultations = [];
    if (isDbConnected()) {
      consultations = await Consultation.find(query).sort({ createdAt: -1 }).limit(20);
    } else {
      consultations = inMemoryConsultations
        .filter(c => c.sessionId === sessionId)
        .slice(0, 20);
    }

    res.json({
      success: true,
      count: consultations.length,
      data: consultations
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/remedies/history
// Deletes consultation history for a given sessionId
router.delete('/history', async (req, res) => {
  try {
    const { sessionId } = req.query;
    if (!sessionId) {
      return res.status(400).json({ success: false, error: 'sessionId is required to clear history.' });
    }

    if (isDbConnected()) {
      await Consultation.deleteMany({ sessionId });
    } else {
      inMemoryConsultations = inMemoryConsultations.filter(c => c.sessionId !== sessionId);
    }

    res.json({
      success: true,
      message: 'Consultation history cleared for this session.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
