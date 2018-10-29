import prepTablesQuery from '../database/queries/prep-tables';
import pool from '../database';


const prepTable = async () => {
  const client = await pool.connect();
  try {
    const response = await client.query(prepTablesQuery);
    return response;
  } finally {
    client.release();
  }
};

prepTable();

export default prepTable;
