import { querySingle } from '../database/queries/query';

/* eslint-disable consistent-return */

export default async function isAdmin(req, res, next) {
  const { id } = req.user;
  const query = {
    text: 'SELECT * FROM users WHERE id=($1)',
    values: [id],
  };
  querySingle(query)
    .then((request) => {
      if (request && request.role !== 'Admin') {
        return res.status(403).send({ Error: 'You are not authorized to perform this operation' });
      }
      next();
    });
}
