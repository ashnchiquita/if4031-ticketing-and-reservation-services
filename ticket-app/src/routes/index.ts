import { Router } from 'express'
import eventRouter from './api/event'
import { authenticateAPIKey } from '@/middleware'
import seatRouter from './api/seat'

const router = Router()
router.use('/event', authenticateAPIKey, eventRouter)
router.use('/seat', authenticateAPIKey, seatRouter)

export default router