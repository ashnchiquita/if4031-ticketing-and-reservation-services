import { DB } from '../database/db';
import { types } from 'cassandra-driver';
import { decodeStatus, encodeStatus } from '../utils/status';

export class InvoicesController {
  public async get(bookingId: types.Uuid) {
    const mapper = await DB.getInvoicesMapper();
    const data = await mapper.get({ bookingId: bookingId });

    if (!data) {
      return data;
    }

    data.status = decodeStatus(data.status);
    return data;
  }

  public async update(bookingId: types.Uuid, status: string) {
    const mapper = await DB.getInvoicesMapper();
    return await mapper.update({ bookingId: bookingId, status: encodeStatus(status) });
  }

  public async delete(bookingId: types.Uuid) {
    const mapper = await DB.getInvoicesMapper();
    return await mapper.remove({ bookingId: bookingId });
  }

  public async create(bookingId: types.Uuid, status: string = 'pending') {
    console.log(status);
    const mapper = await DB.getInvoicesMapper();
    return await mapper.insert({ bookingId: bookingId, status: encodeStatus(status) });
  }
}
