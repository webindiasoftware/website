import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import contentRoutes from './routes/content.js'
import adminContentRoutes from './routes/adminContent.js'
import authRoutes from './routes/auth.js'
import uploadRoutes, { uploadDir } from './routes/upload.js'
import submissionsRoutes from './routes/submissions.js'
import adminSubmissionsRoutes from './routes/adminSubmissions.js'

const app = express()

// CORS_ORIGIN may be a single origin or a comma-separated list (dev vs prod).
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((o) => o.trim()).filter(Boolean)
app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.use('/uploads', express.static(uploadDir))

app.use('/api/content', contentRoutes)
app.use('/api/admin/content', adminContentRoutes)
app.use('/api/admin/upload', uploadRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/submissions', submissionsRoutes)
app.use('/api/admin/submissions', adminSubmissionsRoutes)

app.get('/api/health', (req, res) => res.json({ ok: true }))

const port = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`Backend listening on port ${port}`))
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message)
    process.exit(1)
  })
