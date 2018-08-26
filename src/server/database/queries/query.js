import pool from '..';

export const querySingle = async (query) => {
  const client = await pool.connect();
  try {
    const response = await client.query(query);
    return response.rows[0];
  } finally {
    client.release();
  }
};

export const queryAll = async (query) => {
  const client = await pool.connect();
  try {
    const response = await client.query(query);
    const data = response.rows;
    return data;
  } finally {
    client.release();
  }
};
