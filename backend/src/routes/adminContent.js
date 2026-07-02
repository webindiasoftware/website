import { Router } from 'express'
import Content, { CONTENT_KEYS } from '../models/Content.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = Router()

router.use(verifyToken)

router.put('/:key', async (req, res) => {
  const { key } = req.params
  if (!CONTENT_KEYS.includes(key)) return res.status(404).json({ error: 'Unknown content key' })
  if (req.body?.data === undefined) return res.status(400).json({ error: 'Missing "data" in request body' })

  const doc = await Content.findOneAndUpdate(
    { key },
    { key, data: req.body.data },
    { upsert: true, new: true }
  )
  res.json({ data: doc.data })
})

export default router
