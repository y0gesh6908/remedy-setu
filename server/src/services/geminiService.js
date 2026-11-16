import { GoogleGenerativeAI } from '@google/generative-ai';
import { initialProducts } from '../data/products.js';

/**
 * Build the system prompt with strict grounding in the product catalogue
 */
function buildSystemPrompt(products, language = 'en') {
  const catalogueSummary = products.map((p, idx) => {
    return `${idx + 1}. [SKU: "${p.sku}"] - ${p.name} (${p.nameHi})
   Category: ${p.category} | Price: ₹${p.price} ${p.unit}
   Ruling Planet/Energy: ${p.rulingPlanet}
   Applicable Concerns: ${p.concerns.join(', ')}
   Key Benefits: ${p.benefits.join(', ')}
   Description: ${p.description}`;
  }).join('\n\n');

  const langInstruction = language === 'hi' 
    ? 'The user has requested the response and explanations in Hindi (use clear, devanagari Hindi or easy-to-understand conversational Hindi, with respectful tone).'
    : 'The user has requested the response and explanations in simple, clear English.';

  return `You are the Lead Vedic AI Remedy Assistant at "Remedy Setu" (India's premier faith-tech startup supplying authentic remedies to 10,000+ astrologers).

YOUR PRIME DIRECTIVE (ABSOLUTE RULE):
You MUST recommend remedies (gemstones, rudrakshas, pujas) ONLY AND EXCLUSIVELY from the official Remedy Setu Product Catalogue provided below. 
- NEVER invent, hallucinate, or suggest any gemstone, rudraksha, mantra, or puja outside this catalogue.
- NEVER suggest arbitrary gemstones (like Diamond/Heera, Pearl/Moti, etc. if not in this list).
- Every recommendation MUST match an exact SKU from the catalogue.
- Recommend typically 2 to 3 complementary remedies (e.g., 1 primary gemstone, 1 supportive rudraksha, and/or 1 corrective puja ritual) based on the user's birth details and concern.
- Explain WHY each remedy works in terms of planetary energy in simple, soothing words.
- ${langInstruction}

OFFICIAL REMEDY SETU PRODUCT CATALOGUE (${products.length} Items):
---------------------------------------------------------------------
${catalogueSummary}
---------------------------------------------------------------------

OUTPUT FORMAT INSTRUCTIONS:
You MUST respond ONLY with a valid JSON object (no markdown code blocks, no wrapping, just pure valid JSON) with the following structure:
{
  "astrologicalAnalysis": {
    "summary": "Brief 2-3 sentence astrological reading explaining the planetary imbalance or dosha affecting this area of life",
    "keyPlanetaryInfluence": "e.g. Saturn Sade Sati / Mars Manglik / Rahu turbulence / Jupiter blessing",
    "doshaDetected": "e.g. Shani Dosha, Mangal Dosha, Kaal Sarp Dosha, or Planetary Debilitation"
  },
  "remedies": [
    {
      "sku": "EXACT_SKU_FROM_CATALOGUE",
      "explanation": "Clear explanation of why this specific remedy from Remedy Setu addresses the problem",
      "howToWearOrPerform": "Practical instruction (e.g., Wear on middle finger on Saturday morning, or live sankalp on Monday at Ujjain)"
    }
  ],
  "spiritualAdvice": "A 1-2 sentence comforting Vedic life guidance quote or lifestyle tip"
}`;
}

/**
 * Fallback expert astrologer logic if Gemini API key is missing or quota is exceeded
 */
function getRuleBasedFallback(birthDetails, concern, language, products) {
  const concernLower = (concern || 'career').toLowerCase();
  
  // Filter products by concern
  let matched = products.filter(p => p.concerns.includes(concernLower));
  if (matched.length === 0) matched = products.slice(0, 3);

  // Pick up to 1 gemstone, 1 rudraksha, 1 puja
  const gem = matched.find(p => p.category === 'gemstone') || products.find(p => p.category === 'gemstone');
  const rud = matched.find(p => p.category === 'rudraksha') || products.find(p => p.category === 'rudraksha');
  const puj = matched.find(p => p.category === 'puja') || products.find(p => p.category === 'puja');

  const selected = [gem, rud, puj].filter(Boolean);

  if (language === 'hi') {
    return {
      astrologicalAnalysis: {
        summary: `आपकी जन्म तिथि (${birthDetails.dob}) और ${concern} से जुड़े प्रश्न के आधार पर ग्रहों की स्थिति का विश्लेषण किया गया है। कुंडली में अनुकूल ऊर्जा संचार के लिए विशिष्ट वैदिक उपायों की आवश्यकता है।`,
        keyPlanetaryInfluence: "शनि व बृहस्पति की वर्तमान ग्रह दशा",
        doshaDetected: concernLower.includes('marriage') ? "मंगल व शुक्र प्रभाव" : "शनि/राहु जनित अवरोध"
      },
      remedies: selected.map(item => ({
        sku: item.sku,
        explanation: `${item.nameHi} आपके ${concern} से जुड़े तनाव को दूर कर ग्रहों के शुभ प्रभाव को जागृत करने में अत्यंत प्रभावशाली है।`,
        howToWearOrPerform: item.category === 'gemstone' 
          ? 'शुभ मुहूर्त में पंचामृत से शुद्ध कर धारण करें।'
          : item.category === 'rudraksha'
          ? 'सोमवार को ॐ नमः शिवाय का 108 बार जाप कर गले में धारण करें।'
          : 'उज्जैन/नासिक में हमारे विद्वान पुरोहितों द्वारा आपके नाम व गोत्र से लाइव संकल्प संपन्न होगा।'
      })),
      spiritualAdvice: "प्रतिदिन सूर्य नमस्कार करें और मन को शांत रखकर अपने कर्म पर निष्ठा बनाए रखें।"
    };
  }

  return {
    astrologicalAnalysis: {
      summary: `Based on your birth details (${birthDetails.dob}) and primary concern in ${concern}, the astrological alignment indicates targeted planetary activation is required to clear karmic blockages.`,
      keyPlanetaryInfluence: "Planetary transition affecting primary life houses",
      doshaDetected: concernLower.includes('marriage') ? "Manglik / Venus Affliction" : "Saturnian / Rahu Transits"
    },
    remedies: selected.map(item => ({
      sku: item.sku,
      explanation: `${item.name} channels positive cosmic vibrations to resolve blockages in your ${concern} and brings stability.`,
      howToWearOrPerform: item.category === 'gemstone'
        ? 'Energize with appropriate mantra and wear in ring/pendant on the recommended auspicious weekday.'
        : item.category === 'rudraksha'
        ? 'Chant Om Namah Shivaya 108 times and wear close to the heart chakra on Monday morning.'
        : 'Our certified Vedic priests will conduct live Sankalp at the sacred shrine with your Gotra and family details.'
    })),
    spiritualAdvice: "Combine these sacred remedies with daily gratitude and focused action to experience optimal alignment."
  };
}

/**
 * Generate remedies using Gemini with strict validation
 */
export async function generateRemedies({ birthDetails, concern, language = 'en', catalogueProducts }) {
  const products = (catalogueProducts && catalogueProducts.length > 0) ? catalogueProducts : initialProducts;
  const catalogueMap = new Map(products.map(p => [p.sku, p]));

  const apiKey = process.env.GEMINI_API_KEY;

  let rawResult = null;

  if (apiKey && apiKey.trim() !== '' && apiKey !== 'your_gemini_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Use gemini-1.5-flash or gemini-2.0-flash
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2 // Low temperature for maximum adherence to catalogue
        }
      });

      const prompt = `User Consultation Request:
- Full Name: ${birthDetails.name || 'Seeker'}
- Date of Birth: ${birthDetails.dob}
- Time of Birth: ${birthDetails.tob || 'Not specified'}
- Place of Birth: ${birthDetails.pob || 'India'}
- Life Concern Category: ${concern.category}
- Specific User Question: "${concern.description}"
- Preferred Language: ${language === 'hi' ? 'Hindi (हिंदी)' : 'English'}

Analyze this astrological profile and prescribe remedies ONLY from the Remedy Setu Catalogue.`;

      const systemPrompt = buildSystemPrompt(products, language);

      const result = await model.generateContent([
        { text: systemPrompt },
        { text: prompt }
      ]);

      const responseText = result.response.text();
      rawResult = JSON.parse(responseText);
    } catch (err) {
      console.warn('[Gemini Service] API call failed or rate-limited, falling back to rule-based engine:', err.message);
      rawResult = null;
    }
  } else {
    console.log('[Gemini Service] No GEMINI_API_KEY provided in .env. Utilizing built-in Astrological Expert Engine with 100% Catalogue Grounding.');
  }

  // If Gemini failed or was not configured, use rule-based fallback
  if (!rawResult || !Array.isArray(rawResult.remedies)) {
    rawResult = getRuleBasedFallback(birthDetails, concern.category, language, products);
  }

  // STRICT GUARDRAIL ENFORCEMENT:
  // Cross-verify every recommended item against the catalogue.
  // Never allow any invented product or hallucinated SKU through to the user.
  const validatedRemedies = [];

  for (const item of rawResult.remedies) {
    if (catalogueMap.has(item.sku)) {
      const product = catalogueMap.get(item.sku);
      validatedRemedies.push({
        sku: product.sku,
        name: language === 'hi' ? product.nameHi : product.name,
        nameEn: product.name,
        nameHi: product.nameHi,
        category: product.category,
        price: product.price,
        unit: product.unit,
        explanation: item.explanation || (language === 'hi' ? product.descriptionHi : product.description),
        howToWearOrPerform: item.howToWearOrPerform || 'Follow certified Remedy Setu energization protocol.',
        imageUrl: product.imageUrl,
        benefits: product.benefits,
        rulingPlanet: product.rulingPlanet
      });
    }
  }

  // If none matched (safety edge case), inject primary catalogue matches
  if (validatedRemedies.length === 0) {
    const fallback = getRuleBasedFallback(birthDetails, concern.category, language, products);
    for (const item of fallback.remedies) {
      const product = catalogueMap.get(item.sku);
      if (product) {
        validatedRemedies.push({
          sku: product.sku,
          name: language === 'hi' ? product.nameHi : product.name,
          nameEn: product.name,
          nameHi: product.nameHi,
          category: product.category,
          price: product.price,
          unit: product.unit,
          explanation: item.explanation,
          howToWearOrPerform: item.howToWearOrPerform,
          imageUrl: product.imageUrl,
          benefits: product.benefits,
          rulingPlanet: product.rulingPlanet
        });
      }
    }
  }

  return {
    astrologicalAnalysis: rawResult.astrologicalAnalysis || {
      summary: "Astrological alignment analysis completed based on Vedic planetary principles.",
      keyPlanetaryInfluence: "Planetary transit influence",
      doshaDetected: "Planetary balance required"
    },
    recommendations: validatedRemedies,
    spiritualAdvice: rawResult.spiritualAdvice || (language === 'hi' ? "सकारात्मक रहें और अपने कर्म पर विश्वास रखें।" : "Trust the divine timing and align your actions with noble purpose."),
    aiModelUsed: apiKey ? 'gemini-1.5-flash (with strict catalogue guardrail)' : 'remedy-setu-astrological-engine (grounded in catalogue)'
  };
}

/**
 * Handle conversational chat queries while keeping the assistant strictly bounded by catalogue
 */
export async function handleRemedyChat({ message, chatHistory = [], catalogueProducts, language = 'en' }) {
  const products = (catalogueProducts && catalogueProducts.length > 0) ? catalogueProducts : initialProducts;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '' && apiKey !== 'your_gemini_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const systemPrompt = `You are the Remedy Setu AI Assistant. You assist customers and astrologers in finding authentic Vedic remedies (gemstones, rudraksha, and puja services).
CRITICAL RULE:
- You must ONLY mention, recommend, or discuss products from Remedy Setu's catalogue.
- Catalogue items:
${products.map(p => `- ${p.name} (SKU: ${p.sku}) | Category: ${p.category} | Price: ₹${p.price} ${p.unit}`).join('\n')}
- Never suggest any outside gemstone or unlisted puja.
- Be polite, knowledgeable, and respond in the user's language (${language === 'hi' ? 'Hindi' : 'English'}).`;

      const prompt = `User Message: "${message}"\n\nProvide a helpful, precise reply adhering strictly to the Remedy Setu catalogue.`;
      const result = await model.generateContent([
        { text: systemPrompt },
        { text: prompt }
      ]);
      return { reply: result.response.text() };
    } catch (err) {
      console.warn('[Gemini Chat] Error:', err.message);
    }
  }

  // Graceful rule-based chat response
  const lower = message.toLowerCase();
  const matched = products.find(p => lower.includes(p.name.toLowerCase().split(' ')[0].toLowerCase()) || lower.includes(p.category));

  if (language === 'hi') {
    if (matched) {
      return {
        reply: `नमस्ते! हमारे रेमेडी सेतु कैटलॉग में "${matched.nameHi}" उपलब्ध है। इसकी कीमत ₹${matched.price} (${matched.unit}) है। यह ${matched.rulingPlanet} से संबंधित है और विशेष लाभ प्रदान करता है। क्या आप इसके बारे में विस्तृत जानकारी चाहते हैं?`
      };
    }
    return {
      reply: `रेमेडी सेतु में आपका स्वागत है! हम प्रमाणित रत्न, नेपाली रुद्राक्ष और उज्जैन-काशी के पवित्र वैदिक पूजा अनुष्ठान उपलब्ध कराते हैं। कृपया अपनी जन्म तिथि और समस्या (करियर, विवाह, स्वास्थ्य या धन) बताएं ताकि हम उचित उपाय सुझा सकें।`
    };
  }

  if (matched) {
    return {
      reply: `Hello! In our Remedy Setu catalogue, we offer "${matched.name}" at ₹${matched.price} (${matched.unit}). It is ruled by ${matched.rulingPlanet} and provides proven astrological benefits. Would you like to view recommendation details or add this to your consultation?`
    };
  }

  return {
    reply: `Welcome to Remedy Setu! We supply 100% lab-certified gemstones, original Nepali Rudrakshas, and Vedic puja services. Tell me your birth details or life concern (Career, Marriage, Health, or Finance) and I will recommend the exact remedies from our catalogue.`
  };
}
