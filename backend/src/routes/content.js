import { Router } from 'express'
import Content, { CONTENT_KEYS } from '../models/Content.js'

const router = Router()

// Public — read content for the site
router.get('/:key', async (req, res) => {
  const { key } = req.params
  if (!CONTENT_KEYS.includes(key)) return res.status(404).json({ error: 'Unknown content key' })

  const doc = await Content.findOne({ key })
  if (!doc) return res.status(404).json({ error: 'Content not seeded yet' })
  res.json({ data: doc.data })
})

export default router
