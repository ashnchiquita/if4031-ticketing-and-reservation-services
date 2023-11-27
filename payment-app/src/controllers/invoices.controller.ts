import { DB } from '../database/db';
import { types } from 'cassandra-driver';

export class InvoicesController {
  public async get(bookingId: types.Uuid) {
    const mapper = await DB.getInvoicesMapper();
    return await mapper.get({ bookingId: bookingId });
  }

  public async update(bookingId: types.Uuid, status: boolean) {
    const mapper = await DB.getInvoicesMapper();
    return await mapper.update({ bookingId: bookingId, status: status });
  }

  public async delete(bookingId: types.Uuid) {
    const mapper = await DB.getInvoicesMapper();
    return await mapper.remove({ bookingId: bookingId });
  }

  public async create(bookingId: types.Uuid, status: boolean = false) {
    const mapper = await DB.getInvoicesMapper();
    return await mapper.insert({ bookingId: bookingId, status: status });
  }
}
