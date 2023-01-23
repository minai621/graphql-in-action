import pg from 'pg';

export default async function pgClient() {
  const pgPool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'azdev',
    port: 5432,
  });

  // Test the connection
  const client = await pgPool.connect();
  const tableCountResp = await client.query(
    'select count(*) from information_schema.tables where table_schema = $1;',
    ['azdev']
  );
  client.release();

  console.log(
    'Connected to PostgreSQL | Tables count:',
    tableCountResp.rows[0].count
  );

  pgPool.on('error', (err) => {
    console.error('Unexpected PG client error', err);
    process.exit(-1);
  });

  return {
    pgPool,
    pgClose: async () => await pgPool.end(),
  };
}
