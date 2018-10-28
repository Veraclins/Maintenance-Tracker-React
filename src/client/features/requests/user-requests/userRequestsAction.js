import {
  update,
  getAll,
  getOne,
  create,
} from '../requestActionsHelper';

export const createRequest = (request, user) => async dispatch => create(dispatch, user, request);

export const updateRequest = (request, user) => async (dispatch) => {
  request.url = `/users/requests/${request.id}`;
  return update(dispatch, user, request, 'USER');
};

export const getAllRequests = user => async dispatch => getAll(dispatch, user, 'USER');

export const getSingleRequest = (user, requestId) => async dispatch => getOne(dispatch, user, requestId, 'USER');
