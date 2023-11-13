import { Client, types, mapping } from 'cassandra-driver';

export class Scylla {
  private static instance: Client | null = null;
  private static mapper: mapping.Mapper;

  private static createInstance() {
    Scylla.instance = new Client({ contactPoints: [process.env.SCYLLADB_HOST as string] });

    Scylla.instance.connect().then(() => {
      const queries = [
        `CREATE KEYSPACE IF NOT EXISTS payment WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }`,
        'USE payment',
        `CREATE TABLE IF NOT EXISTS invoices (booking_id uuid PRIMARY KEY, status boolean)`,
      ];

      let promise: Promise<void | types.ResultSet | null> = Promise.resolve();

      queries.forEach((query) => (promise = promise.then(() => Scylla.instance && Scylla.instance.execute(query))));
      return promise;
    });

    Scylla.instance.keyspace = 'payment';

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

    Scylla.mapper = new mapping.Mapper(Scylla.instance, mappingOptions);
  }

  public static getPaymentMapper() {
    if (!Scylla.mapper) {
      Scylla.createInstance();
    }

    return Scylla.mapper.forModel('Payment');
  }
}
