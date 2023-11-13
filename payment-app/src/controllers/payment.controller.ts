import { Scylla } from '../database/scylla';

export class PaymentController {
  private paymentMapper = Scylla.getPaymentMapper();

  public async getByBookingId(bookingId: string) {
    return await this.paymentMapper.get({ bookingId: bookingId });
  }

  public async getAll() {
    return await this.paymentMapper.find({});
  }

  public async updateStatus(bookingId: string, status: boolean) {
    return await this.paymentMapper.update({ bookingId: bookingId, status: status });
  }

  public async delete(bookingId: string) {
    return await this.paymentMapper.remove({ bookingId: bookingId });
  }

  public async create(bookingId: string, status: boolean = false) {
    return await this.paymentMapper.insert({ bookingId: bookingId, status: status });
  }
}
