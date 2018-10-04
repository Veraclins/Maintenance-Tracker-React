import { Pool } from 'pg';

const ssl = process.env.NODE_ENV === 'production';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl,
});


export default pool;
