import pool from '..';

export async function querySingle(query) {
  const client = await pool.connect();
  try {
    const response = await client.query(query);
    return response.rows[0];
  } catch (error) {
    return { Error: error.message };
  } finally {
    client.release();
  }
}

export async function queryAll(query) {
  const client = await pool.connect();
  try {
    const response = await client.query(query);
    const data = response.rows;
    return data;
  } catch (error) {
    return { Error: error.message };
  } finally {
    client.release();
  }
}
