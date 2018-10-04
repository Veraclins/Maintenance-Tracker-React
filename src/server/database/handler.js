import { querySingle } from './queries/query';
import { formatSingle } from './formatter';

export const validParam = (param) => {
  if (!/[0-9]/.test(param)) {
    return false;
  }
  return true;
};

export const handleRequest = (res, query, error) => {
  querySingle(query)
    .then((request) => {
      if (request !== null && typeof request === 'object') {
        return res.status(200).send({
          status: 'success',
          request: formatSingle(request),
        });
      }
      return res.status(404).send({
        status: 'error',
        message: error.message,
      });
    });
};
