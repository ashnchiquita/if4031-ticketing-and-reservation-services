import env from '@/config/env'
import amqp, { Connection } from 'amqplib/callback_api'
import Logger from '../logger'

const createMQProducer = (amqpUrl: string, queueName: string) => {
  Logger.info('Connecting to RabbitMQ...')
  let ch: any
  amqp.connect(amqpUrl, (errorConnect: Error, connection: Connection) => {
    if (errorConnect) {
      Logger.error('Error connecting to RabbitMQ: ', errorConnect)
      return
    }

    connection.createChannel((errorChannel, channel) => {
      if (errorChannel) {
        Logger.error('Error creating channel: ', errorChannel)
        return
      }

      ch = channel
      Logger.info('Connected to RabbitMQ')
    })
  })
  return (msg: string) => {
    Logger.info(`Produce message to RabbitMQ... ${msg}`)
    ch.sendToQueue(queueName, Buffer.from(msg))
  }
}

export const paymentMQProducer = createMQProducer(env.RABBITMQ_URL, 'payment_message')
export const bookingMQProducer = createMQProducer(env.RABBITMQ_URL, 'booking_message')

export default createMQProducer
