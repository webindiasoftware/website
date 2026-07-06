import { Router } from 'express'
import Submission from '../models/Submission.js'

const router = Router()

// Public — visitors submit the home page contact form
router.post('/', async (req, res) => {
  const { name, email, sector, urgency, brief } = req.body || {}
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' })

  const doc = await Submission.create({ name, email, sector, urgency, brief })
  res.status(201).json({ data: doc })
})

export default router
