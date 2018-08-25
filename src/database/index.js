import { Pool } from 'pg';

// This instantiates a connection pool that can be imported and used in other places
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: false, // for local development
  ssl: true, // for production
});


export default pool;
