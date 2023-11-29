import createMQConsumer from "./consumer";
import createMQProducer, {paymentMQProducer, bookingMQProducer} from "./producer";

export {
    createMQConsumer,
    createMQProducer,
    paymentMQProducer,
    bookingMQProducer
}