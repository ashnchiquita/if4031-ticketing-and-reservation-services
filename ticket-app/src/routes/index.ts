import { Router } from 'express'
import eventRouter from './api/event'
import { authenticateClientAPIKey, authenticatePaymentAPIKey } from '@/middleware'
import seatRouter from './api/seat'
import bookingRouter from './api/booking'
import webhookRouter from './api/webhook'
import bookingQueueRouter from './api/bookingQueue'

const router = Router()
router.use('/event', authenticateClientAPIKey, eventRouter)
router.use('/seat', authenticateClientAPIKey, seatRouter)
router.use('/booking', authenticateClientAPIKey, bookingRouter)
router.use('/webhook', authenticatePaymentAPIKey, webhookRouter)
router.use('/booking-queue', authenticateClientAPIKey, bookingQueueRouter)

export default router