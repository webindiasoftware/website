import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    sector: { type: String, default: 'GENERAL INQUIRY' },
    urgency: { type: String, default: 'standard' },
    brief: { type: String, default: '' },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Submission', submissionSchema)
