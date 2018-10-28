import { Pool } from 'pg';
import { } from 'dotenv/config';


const ssl = process.env.NODE_ENV === 'production';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl,
});

export default pool;
