import prepTablesQuery from '../database/queries/prep-tables';
import pool from '../database';


async function prepTable(req, res) {
  const client = await pool.connect();
  try {
    const response = await client.query(prepTablesQuery);
    return res.status(200).send({ response });
  } catch (error) {
    return res.status(500).send({ Error: error.message });
  } finally {
    client.release();
  }
}

export default prepTable;
