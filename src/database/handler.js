import { querySingle } from './queries/query';

export function validParam(res, param) {
  if (isNaN(param)) {
    res.status(400).send({ Error: 'Request id must be a number' });
  }
}

export function handleRequest(res, query, error) {
  querySingle(query)
    .then((request) => {
      if (request !== null && typeof request === 'object') {
        res.send(request);
      } else {
        res.status(404).send(error);
      }
    })
    .catch(err => res.status(500).send({ Error: err.message }));
}
