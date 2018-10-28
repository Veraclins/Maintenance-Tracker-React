import { update, getAll, getOne } from '../requestActionsHelper';

export const adminUpdateRequest = (request, status, user) => async (dispatch) => {
  request.url = `/requests/${request.id}/${status}`;
  return update(dispatch, user, request, 'ADMIN');
};

export const getAllAdminRequests = user => async dispatch => getAll(dispatch, user, 'ADMIN');

export const adminViewRequest = (user, requestId) => async dispatch => getOne(dispatch, user, requestId, 'ADMIN');
