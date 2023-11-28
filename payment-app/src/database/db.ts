import { Client, types, mapping } from 'cassandra-driver';

export class DB {
  private static instance: Client | null = null;
  private static mapper: mapping.Mapper;

  private static async connect() {
    DB.instance = new Client({
      contactPoints: [process.env.DB_HOST as string],
      localDataCenter: 'datacenter1',
    });

    await DB.instance.connect().then(() => {
      const queries = [
        `CREATE KEYSPACE IF NOT EXISTS payment WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }`,
        'USE payment',
        `CREATE TABLE IF NOT EXISTS invoices (booking_id uuid PRIMARY KEY, status boolean)`,
      ];

      let promise: Promise<void | types.ResultSet | null> = Promise.resolve();

      queries.forEach((query) => {
        promise = promise.then(() => DB.instance && DB.instance.execute(query));
      });
      return promise;
    });

    DB.instance.keyspace = 'payment';

    const mappingOptions = {
      models: {
        Invoices: {
          tables: ['invoices'],
          keyspace: 'payment',
          columns: {
            booking_id: 'bookingId',
            status: 'status',
          },
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    DB.mapper = new mapping.Mapper(DB.instance, mappingOptions);
  }

  public static async getInvoicesMapper() {
    if (!DB.mapper) {
      await DB.connect();
    }

    return DB.mapper.forModel('Invoices');
  }
}
