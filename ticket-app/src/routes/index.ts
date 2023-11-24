import { Router } from 'express'
import eventRouter from './api/event'
import { authenticateAPIKey } from '@/middleware'
import seatRouter from './api/seat'
import bookingRouter from './api/booking'

const router = Router()
router.use('/event', authenticateAPIKey, eventRouter)
router.use('/seat', authenticateAPIKey, seatRouter)
router.use('/booking', authenticateAPIKey, bookingRouter)

export default router