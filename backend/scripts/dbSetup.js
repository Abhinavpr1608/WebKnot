import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const root = path.resolve(process.cwd(), 'db');
const schemaPath = path.join(root, 'schema.sql');
const seedPath = path.join(root, 'seed.sql');

async function run() {
  const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
  if (!DB_HOST || !DB_USER) {
    console.error('Please set DB_HOST and DB_USER in .env');
    process.exit(1);
  }
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const seed = fs.readFileSync(seedPath, 'utf8');
  const connection = await mysql.createConnection({ host: DB_HOST, user: DB_USER, password: DB_PASSWORD || '', multipleStatements: true });
  try {
    console.log('Applying schema...');
    await connection.query(schema);
    console.log('Seeding data...');
    await connection.query(seed);
    console.log('Done.');
  } finally {
    await connection.end();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
