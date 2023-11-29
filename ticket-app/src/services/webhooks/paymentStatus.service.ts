import {updateBookingStatusService} from '../booking'
import {bookingMQProducer} from '@/utils/amqp/producer'
import {eq} from 'drizzle-orm'
import {seats} from '@/models'
import {generatePaymentStatusPDF} from '@/utils/pdfgenerator'
import {DrizzlePool} from '@/common/types'
import {Logger, upload} from '@/utils'

export interface PaymentStatusRequest {
  bookingId: string
  status: 'success' | 'failed'
  message: string
}

const paymentStatusService = async (db: DrizzlePool, req: PaymentStatusRequest) => {
  const {bookingId, status, message} = req
  Logger.info(`paymentStatusService: ${JSON.stringify(req)}`)

  return await db.transaction(async (trx) => {
    const booking = await updateBookingStatusService(
      trx,
      {
        id: bookingId,
        status: status === 'success' ? 'confirmed' : 'cancelled',
      },
      ['pending'],
    )

    if (!booking) {
      return null
    }

    const seatDetail = await trx.query.seats.findFirst({
      where: eq(seats.id, booking.seat_id),
      with: {
        event: {
          columns: {
            title: true,
          },
        },
      },
      columns: {
        number: true,
        event_id: true,
      },
    })

    const bookingDetail = {
      ...booking,
      seat: seatDetail,
      message: message,
    }

    Logger.info(`paymentStatusService: generate PDF...`)
    const blob = await generatePaymentStatusPDF(bookingDetail)

    // Upload to S3 and get the url
    Logger.info(`paymentStatusService: Uploading PDF...`)
    const url = await upload(`${bookingId}.pdf`, blob)
    Logger.info(`URL: ${url}`)

    Logger.info(`paymentStatusService: sending message to client's message queue.`)
    const msg = {
        bookingId: bookingId,
        userId: booking.user_id,
        status: status,
        message: message,
        pdfUrl: url
    }
    bookingMQProducer(JSON.stringify(msg))
    return bookingDetail
  })
}

export default paymentStatusService
