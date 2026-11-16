import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: true
    },
    tob: {
      type: String
    },
    pob: {
      type: String,
      required: true
    },
    concernCategory: {
      type: String,
      required: true,
      enum: ['career', 'marriage', 'health', 'finance', 'general']
    },
    concernDescription: {
      type: String,
      required: true
    },
    language: {
      type: String,
      enum: ['en', 'hi'],
      default: 'en'
    },
    astrologicalAnalysis: {
      summary: String,
      keyPlanetaryInfluence: String,
      doshaDetected: String
    },
    recommendations: [
      {
        sku: { type: String, required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        unit: { type: String, default: 'piece' },
        explanation: { type: String, required: true },
        howToWearOrPerform: { type: String },
        imageUrl: { type: String }
      }
    ],
    aiModelUsed: {
      type: String,
      default: 'gemini-1.5-flash'
    },
    ipAddress: String
  },
  {
    timestamps: true
  }
);

export const Consultation = mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);
