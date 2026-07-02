import mongoose from 'mongoose'

export const CONTENT_KEYS = ['home', 'services', 'products', 'navbarProducts', 'blog', 'productDetails']

const contentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, enum: CONTENT_KEYS },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true, minimize: false }
)

export default mongoose.model('Content', contentSchema)
