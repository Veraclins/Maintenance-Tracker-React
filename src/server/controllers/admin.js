import { queryAll } from '../database/queries/query';
import { validParam, handleRequest } from '../database/handler';

const error = {
  message: 'The given request id does not exist or it has already been approved or resolved. Please check again',
};
export const adminGetAllRequests = (req, res) => {
  queryAll('SELECT * FROM requests ORDER BY updated_at DESC')
    .then(requests => res.status(200).send({
      status: 'success',
      requests,
    }));
};

export const requestApproval = (req, res, status, opposite) => {
  const qString = 'UPDATE requests SET status=($1), updated_at=($2) WHERE (id=($3) AND (status=($4) OR status=($5))) RETURNING *';
  const { requestId } = req.params;
  const values = [status, 'NOW()', requestId, 'pending', opposite];
  if (validParam(requestId)) {
    const query = {
      text: qString,
      values,
    };
    return handleRequest(res, query, error);
  }
  return res.status(400).send({
    status: 'error',
    message: 'Request id must be a number',
  });
};

export const getRequest = (req, res) => {
  const { requestId } = req.params;
  if (validParam(requestId)) {
    const query = {
      text: 'SELECT * FROM requests WHERE (id=($1))',
      values: [requestId],
    };
    const errors = { message: "You don't have a request with the given id. Please check again" };
    return handleRequest(res, query, errors);
  }
  return res.status(400).send({
    status: 'error',
    message: 'Request id must be a number',
  });
};

export const approveRequest = (req, res) => {
  requestApproval(req, res, 'approved', 'disapproved');
};

export const disapproveRequest = (req, res) => {
  requestApproval(req, res, 'disapproved', 'approved');
};

export const resolveRequest = (req, res) => {
  const { requestId } = req.params;
  if (validParam(requestId)) {
    const query = {
      text: 'UPDATE requests SET status=($1), updated_at=($2) WHERE (id=($3) AND status=($4)) RETURNING *',
      values: ['resolved', 'NOW()', requestId, 'approved'],
    };
    return handleRequest(res, query, error);
  }
  return res.status(400).send({
    status: 'error',
    message: 'Request id must be a number',
  });
};
