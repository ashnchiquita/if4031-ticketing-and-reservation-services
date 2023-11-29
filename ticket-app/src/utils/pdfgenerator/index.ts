import {jsPDF} from 'jspdf'
import generateQR from '../qrcode'
import Logger from '../logger'

const generatePaymentStatusPDF = async (bookingDetail: {
  seat:
    | {
        number: number
        event_id: string
        event: {
          title: string
        }
      }
    | undefined
  id: string
  message: string
  status: 'pending' | 'confirmed' | 'cancelled'
  seat_id: string
  user_id: string
  created_at: Date
  updated_at: Date
}) => {
  const doc = new jsPDF()
  doc.text(`Booking ID: ${bookingDetail.id}`, 10, 10)
  doc.text(`Event: ${bookingDetail.seat?.event.title}`, 10, 30)
  doc.text(`Seat Number: ${bookingDetail.seat?.number}`, 10, 20)
  doc.text(`Status: ${bookingDetail.status}`, 10, 40)
  doc.text(`Message: ${bookingDetail.message}`, 10, 50)

  if (bookingDetail.status === 'confirmed') {
    Logger.info(`paymentStatusService: generate QR Code...`)
    const qrCode = await generateQR(bookingDetail.id)

    if (!qrCode) {
      throw new Error(`paymentStatusService: QR Code generation failed.`)
    }

    Logger.info(`paymentStatusService: QR Code generated.`)
    doc.addImage(qrCode, 'PNG', 10, 60, 50, 50)
  }

  return new Blob([doc.output('blob')], {type: 'application/pdf'})
}

export {generatePaymentStatusPDF}
