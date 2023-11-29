import amqp, { Message } from 'amqplib/callback_api'
import Logger from '../logger'

const createMQConsumer = (amqpURl: string, queueName: string) => {
  Logger.info('Connecting to RabbitMQ...')
  return () => {
    amqp.connect(amqpURl, (errConn, conn) => {
      if (errConn) {
        throw errConn
      }

      conn.createChannel((errChan, chan) => {
        if (errChan) {
          throw errChan
        }

       Logger.info('Connected to RabbitMQ')
        chan.assertQueue(queueName, { durable: true })
        chan.consume(queueName, (msg: Message | null) => {
          if (msg) {
            const parsed = JSON.parse(msg.content.toString())
           Logger.info('Consuming message', parsed)
            switch (parsed.action) {
              default:
                break
            }
          }
        }, { noAck: true })
      })
    })
  }
}

export default createMQConsumer