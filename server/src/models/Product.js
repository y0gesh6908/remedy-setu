import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true
    },
    nameHi: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['gemstone', 'rudraksha', 'puja']
    },
    price: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      default: 'piece'
    },
    rulingPlanet: {
      type: String,
      required: true
    },
    concerns: [
      {
        type: String,
        enum: ['career', 'marriage', 'health', 'finance']
      }
    ],
    description: {
      type: String,
      required: true
    },
    descriptionHi: {
      type: String,
      required: true
    },
    benefits: [String],
    imageUrl: {
      type: String
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
