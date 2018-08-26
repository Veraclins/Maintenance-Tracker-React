import { queryAll } from '../database/queries/query';
import { validParam, handleRequest } from '../database/handler';

const error = {
  Error: 'The given request id does not exist or it has already been approved or resolved. Please check again',
};
export const adminGetAllRequests = (req, res) => {
  queryAll('SELECT * FROM requests ORDER BY updated_at DESC')
    .then(data => res.status(200).send(data));
};

export const requestApproval = (req, res, status) => {
  const qString = 'UPDATE requests SET status=($1), updated_at=($2) WHERE (id=($3) AND (status=($4) OR status=($5))) RETURNING *';
  const { requestId } = req.params;
  const values = [status, 'NOW()', requestId, 'pending', 'approved'];
  if (validParam(requestId)) {
    const query = {
      text: qString,
      values,
    };
    return handleRequest(res, query, error);
  }
  return res.status(400).send({ Error: 'Request id must be a number' });
};

export const approveRequest = (req, res) => {
  requestApproval(req, res, 'approved');
};

export const disapproveRequest = (req, res) => {
  requestApproval(req, res, 'disapproved');
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
  return res.status(400).send({ Error: 'Request id must be a number' });
};
