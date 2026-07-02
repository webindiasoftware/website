import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { verifyToken } from '../middleware/verifyToken.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const uploadDir = path.join(__dirname, '..', '..', 'uploads')
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  },
})

const ALLOWED_MIME = /^(image\/(jpeg|png|webp|gif|svg\+xml)|video\/(mp4|webm|quicktime))$/

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB — covers hero video uploads
  fileFilter: (req, file, cb) => {
    cb(ALLOWED_MIME.test(file.mimetype) ? null : new Error('Unsupported file type'), ALLOWED_MIME.test(file.mimetype))
  },
})

const router = Router()

router.post('/', verifyToken, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    res.json({ url })
  })
})

export default router
