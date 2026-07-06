import { Router } from 'express'
import Submission from '../models/Submission.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = Router()

router.use(verifyToken)

router.get('/', async (req, res) => {
  const docs = await Submission.find().sort({ createdAt: -1 })
  res.json({ data: docs })
})

router.delete('/:id', async (req, res) => {
  const doc = await Submission.findByIdAndDelete(req.params.id)
  if (!doc) return res.status(404).json({ error: 'Submission not found' })
  res.json({ ok: true })
})

export default router
