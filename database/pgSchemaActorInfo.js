const { Pool, Client } = require('pg');
const path = require('path');
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'SDC',
  password: '',
  port: 5432,
});

(async () => {
  const client = await pool.connect();

  try {
    console.time('timing seed start actor');
    // Transaction BEGIN!
    await client.query('BEGIN');
    console.log('creating actorinfo table!');
    await client.query(`
      CREATE TABLE IF NOT EXISTS ActorInfo(
        id NUMERIC NOT NULL,
        name VARCHAR(100),
        title VARCHAR(100),
        role VARCHAR(100),
        photo VARCHAR(100),
        bio VARCHAR(2000),
        filmography VARCHAR []
        );
    `);

    console.log('writing to database!');
    const copyPath = path.join(__dirname, '../actorData.csv');
    await client.query(`
      COPY ActorInfo FROM '${copyPath}' WITH (FORMAT CSV, HEADER);
    `);

    console.log('commiting!');
    await client.query('COMMIT');
    // Transaction END!
    console.timeEnd('timing seed end actor');
  } catch (e) {
    await client.query('ROLLBACK');
    console.log('error!');
    throw e;
  } finally {
    console.log('releasing...');
    client.release();
  }
})().catch(e => console.error(e.stack));


// CREATE TABLE IF NOT EXISTS MovieInfo(
//   movieId NUMERIC NOT NULL,
//   actors ARRAY
//   );