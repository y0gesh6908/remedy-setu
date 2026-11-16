# 🕉️ Remedy Setu — AI Remedy Assistant (Option 2)

> **DPIIT-Recognised Faith-Tech Startup | Software Development Intern (Full Stack) Assignment**  
> Built with **React + Node.js + Express + MongoDB + Google Gemini AI**

---

## 🌟 Executive Summary

**Remedy Setu** (formerly *Humara Pandit*, D A Dharm Sathi Pvt. Ltd.) powers the remedy infrastructure of India, serving a network of over **10,000 astrologers**, numerologists, and spiritual retailers.

This repository implements **Option 2 — AI Remedy Assistant (AI)**:
An end-to-end, mobile-responsive web platform where users submit birth details (DOB, Time of Birth, Place of Birth) and a life concern (Career, Marriage, Health, Finance). **Google Gemini AI** evaluates planetary influences and prescribes remedies (gemstones, rudrakshas, puja services) **strictly and exclusively** from our curated **20-item Remedy Setu Product Catalogue**, with full price transparency and explanations in simple **Hindi** or **English**.

---

## 🛡️ Anti-Hallucination & Catalogue Guardrail Guarantee

One of the most critical requirements of Option 2 is:  
> *"It must never recommend anything outside the catalogue."*

Here is how our dual-layer guardrail architecture ensures **zero hallucinations**:

1. **Strict Context Prompt Grounding (System Layer)**:
   - The AI prompt contains the entire 20-item catalogue with exact `sku`, verified prices (e.g. ₹8,500/ratti for Blue Sapphire, ₹2,499 for 7 Mukhi Rudraksha, ₹11,000 for Maha Mrityunjaya Japa), category, and benefits.
   - The model is instructed under zero-tolerance rules that it is an API agent for Remedy Setu and is **strictly prohibited** from recommending any outside gemstone (e.g., Diamond, Pearl) or arbitrary puja.
   - Constrained to low temperature (`0.2`) and strict structured JSON schema output.

2. **Backend Interceptor & Validator (Application Layer - `geminiService.js`)**:
   - The backend parses the AI response and validates every single returned SKU against the database catalogue map (`catalogueMap.has(item.sku)`).
   - If an uncatalogued SKU or price is returned, it is immediately stripped or mapped to the closest verified catalogue remedy.
   - No invented products or fictitious prices can ever reach the client interface.

3. **100% Resilience & In-Memory Mode**:
   - If MongoDB or the external Gemini API key is not configured locally, the server smoothly activates its **Astrological Expert Rules Engine**, guaranteeing zero downtime during demos or evaluation runs.

---

## 🚀 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons | Responsive Vedic/faith-tech UI, bilingual (Hindi/English), instant filtering |
| **Backend** | Node.js (ES Modules), Express.js | REST API, validation guardrails, consultation logging |
| **Database** | MongoDB & Mongoose (with in-memory fallback) | Product catalogue storage, automatic seeder, consultation histories |
| **AI / LLM** | Google Gemini 1.5 Flash (`@google/generative-ai`) | Planetary dosha analysis, contextual remedy matching, multi-turn chat |

---

## 📦 Product Catalogue (20 Items with Tiered Pricing)

Our catalogue contains 20 authentic Remedy Setu items with authentic pricing and ruling planets:

### 1. Gemstones (Ratna) — Certified Natural
1. **Blue Sapphire (Certified Ceylon Neelam)** — `GEM-NEELAM-01` — ₹8,500 / ratti (Saturn / Shani)
2. **Yellow Sapphire (Sri Lanka Pukhraj)** — `GEM-PUKHRAJ-02` — ₹6,500 / ratti (Jupiter / Guru)
3. **Emerald (Zambian Panna)** — `GEM-PANNA-03` — ₹4,800 / ratti (Mercury / Budh)
4. **Red Coral (Italian Moonga)** — `GEM-MOONGA-04` — ₹2,200 / ratti (Mars / Mangal)
5. **Ruby (Burmese Manikya)** — `GEM-MANIK-05` — ₹5,500 / ratti (Sun / Surya)
6. **Hessonite (Ceylon Gomed)** — `GEM-GOMED-06` — ₹1,800 / ratti (Rahu)
7. **Cat's Eye (Chrysoberyl Lehsuniya)** — `GEM-LEHSUNIYA-07` — ₹2,000 / ratti (Ketu)

### 2. Sacred Rudrakshas — Original Nepali
8. **5 Mukhi Nepali Rudraksha Kantha Mala (108+1 Beads)** — `RUD-5MUKHI-MALA-08` — ₹1,499 / piece
9. **7 Mukhi Nepali Rudraksha (Goddess Mahalaxmi)** — `RUD-7MUKHI-09` — ₹2,499 / piece
10. **1 Mukhi Rudraksha (Pure Half Moon Kaju Dana)** — `RUD-1MUKHI-10` — ₹4,999 / piece
11. **2 Mukhi Nepali Rudraksha (Ardhanareshwar)** — `RUD-2MUKHI-11` — ₹1,899 / piece
12. **6 Mukhi Nepali Rudraksha (Lord Kartikeya)** — `RUD-6MUKHI-12` — ₹1,299 / piece
13. **10 Mukhi Nepali Rudraksha (Lord Vishnu Kavach)** — `RUD-10MUKHI-13` — ₹3,200 / piece
14. **Nepali Sarva Siddha Mala (1 to 14 Mukhi + Gauri Shankar + Ganesh)** — `RUD-SIDDHA-MALA-14` — ₹28,000 / mala set

### 3. Sacred Temple Puja Services — Live Video Sankalp
15. **Maha Mrityunjaya Japa & Havan (1.25 Lakh Chants at Ujjain / Varanasi)** — `PUJA-MAHAMRITYUNJAYA-15` — ₹11,000
16. **Mangal Dosh Shanti Puja (Mangalnath Mandir, Ujjain)** — `PUJA-MANGAL-DOSH-16` — ₹5,500
17. **Kaal Sarp Dosh Nivaran Puja (Trimbakeshwar Jyotirlinga, Nashik)** — `PUJA-KAAL-SARP-17` — ₹7,100
18. **Kuber-Lakshmi Dhan Varsha Puja & Energized Yantra** — `PUJA-KUBER-LAKSHMI-18` — ₹4,500
19. **Shani Sade Sati Shanti Puja & Tailabhishekam (Shani Shingnapur)** — `PUJA-SHANI-SADE-SATI-19` — ₹4,200
20. **Sampoorna Navgrah Shanti Havan (Complete 9-Planet Harmonization)** — `PUJA-NAVGRAH-SHANTI-20` — ₹3,800

---

## ⚡ Quick Start Guide (Run Locally in Under 3 Minutes)

### Prerequisites
- Node.js (v18 or higher)
- (Optional) MongoDB running locally or MongoDB Atlas URI
- (Optional) Google Gemini API Key

### 1. Clone & Setup Backend
```bash
cd remedy-setu/server
npm install
```

Configure `.env` (a ready-to-run template is included):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/remedy_setu
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If you do not have a Gemini API key or MongoDB installed, the backend automatically runs in In-Memory Expert mode with 100% functionality!)*

Start the backend:
```bash
npm start
```
Server runs on: `http://localhost:5000`

### 2. Setup & Start Frontend
Open a new terminal:
```bash
cd remedy-setu/client
npm install
npm run dev
```
Client runs on: `http://localhost:3000`

---

## 🎯 Key Features Completed

- [x] **Dual Interaction Modes**:
  1. **Remedy Finder (Form Mode)**: Guided astrological intake with DOB, TOB, POB, Concern category, and specific questions.
  2. **AI Astrologer Live Chat (Conversational Mode)**: Multi-turn chat assistant answering product questions strictly within the catalogue.
- [x] **Bilingual Support (Hindi & English)**:
  - Instant one-click toggle in the navbar.
  - Explanations, product names, and remedies adapt smoothly to Hindi (हिंदी) or English.
- [x] **Strict Anti-Hallucination Guardrail**:
  - Prompt bounding + backend verification against MongoDB catalogue IDs.
- [x] **Vedic Remedy Prescription Card**:
  - Displays planetary reading, dosha evaluation, product cards with images, prices, "Why it works" rationales, and "How to wear/perform" guidelines.
  - Direct WhatsApp order/inquiry integration pre-filled with SKU and customer details.
  - Print/Save prescription feature.
- [x] **Full 20-Item Catalogue Browser**:
  - Live filtering by category (Gemstone, Rudraksha, Puja) and concern (Career, Marriage, Health, Finance).
  - Search by product name, planet, or SKU.
- [x] **MongoDB Consultation History**:
  - Stores all consultations with seeker details, detected doshas, and recommended items.

---

## 💡 What We Would Add Next (Roadmap)

1. **Automated Kundali Chart Generator**: Integrate Swiss Ephemeris / D-1 Rashi chart calculation to visualize planetary house placements directly on screen.
2. **Astrologer Referral & White-Labeling**: Allow our 10,000+ astrologer partners to brand the prescription card with their own clinic/consultancy logo and phone number.
3. **One-Click Razorpay Payment Gateway**: Allow instant checkout for B2B wholesale sample kits and consecrated puja bookings.
4. **WhatsApp Webhook Bot**: Deploy the exact same Gemini prompt engine directly over the Remedy Setu WhatsApp Business API.

---

## 🎥 Video Walkthrough Guide (6-10 Minutes Outline)

For your assignment submission video:
1. **Demo (3-4 min)**:
   - Show Remedy Finder form submission with sample birth details.
   - Switch language between English and Hindi.
   - Show the generated Prescription Card with exact pricing and "Why this works".
   - Switch to AI Live Chat and ask follow-up questions.
   - Show the 20-item Catalogue browser and WhatsApp inquiry button.
2. **Code Walkthrough (3-4 min)**:
   - Walk through `server/src/services/geminiService.js`: show system prompt, temperature `0.2`, JSON output format, and the backend verification loop.
   - Walk through `server/src/models/Product.js` and `server/src/data/products.js`.
   - Show `client/src/components/PrescriptionCard.jsx` and `ConsultationForm.jsx`.
3. **Decisions & Next Steps (1-2 min)**:
   - Explain why React + Node + Express + MongoDB + Gemini was chosen.
   - Highlight the anti-hallucination guardrail strategy.
