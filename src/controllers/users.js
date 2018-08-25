import { queryAll, querySingle } from '../database/queries/query';
import { validParam, handleRequest } from '../database/handler';

export const getAllRequests = (req, res) => {
  const userId = req.user.id;
  const query = {
    text: 'SELECT * FROM requests WHERE user_id=($1) ORDER BY updated_at DESC',
    values: [userId],
  };
  queryAll(query)
    .then(data => res.status(200).send(data));
};

export const createRequest = (req, res) => {
  const {
    title, device, description,
  } = req.body;
  const userId = req.user.id;
  const query = {
    text: 'INSERT INTO requests (user_id, title, device, description) VALUES($1, $2, $3, $4) RETURNING *',
    values: [userId, title, device, description],
  };
  querySingle(query)
    .then((request) => {
      res.status(201).send(request);
    });
};

export const getRequestById = (req, res) => {
  const { requestId } = req.params;
  validParam(res, requestId);
  const userId = req.user.id;
  const query = {
    text: 'SELECT * FROM requests WHERE (id=($1) AND user_id=($2))',
    values: [requestId, userId],
  };
  const error = { Error: "You don't have a request with the given id. Please check again" };
  handleRequest(res, query, error);
};

export const UpdateRequest = (req, res) => {
  const {
    title, device, description,
  } = req.body;
  const userId = req.user.id;
  const { requestId } = req.params;
  validParam(res, requestId);
  const query = {
    text: 'UPDATE requests SET title=($1), device=($2), description=($3), updated_at=($4) WHERE (id=($5) AND user_id=($6) AND (status=($7) OR status=($8))) RETURNING *',
    values: [title, device, description, 'NOW()', requestId, userId, 'pending', 'disapproved'],
  };
  const error = { Error: "You don't have a request with the given id or it has already been approved. Please check again" };
  handleRequest(res, query, error);
};
