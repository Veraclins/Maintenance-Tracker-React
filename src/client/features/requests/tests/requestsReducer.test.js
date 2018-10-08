import requestsReducer from '../requestsReducer';
import {
  USER_CREATE_REQUEST_SUCCESSFUL,
  USER_GET_REQUEST_SUCCESSFUL,
  USER_GET_ALL_REQUESTS_SUCCESSFUL,
  USER_GET_REQUEST_FAILED,
  USER_CREATE_REQUEST_FAILED,
  USER_GET_ALL_REQUESTS_FAILED,
  ADMIN_GET_REQUEST_SUCCESSFUL,
  ADMIN_UPDATE_REQUEST_SUCCESSFUL,
  ADMIN_GET_ALL_REQUESTS_SUCCESSFUL,
  ADMIN_GET_REQUEST_FAILED,
  ADMIN_UPDATE_REQUEST_FAILED,
  ADMIN_GET_ALL_REQUESTS_FAILED,
} from '../../../shared/constants/ActionTypes';

const request = {
  id: 13,
  request_id: 2,
  title: 'General repainting',
  device: 'Smartphone',
  description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
  status: 'pending',
  created_at: '2018-10-06T23:14:25.294Z',
  updated_at: '2018-10-06T23:14:25.294Z',
};
const requests = [
  {
    id: 1,
    user_id: 2,
    title: 'Excellent Work',
    device: 'Desktop',
    description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
    status: 'disapproved',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:25.357Z',
  },
  {
    id: 13,
    user_id: 2,
    title: 'General repainting',
    device: 'Smartphone',
    description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
    status: 'pending',
    created_at: '2018-10-06T23:14:25.294Z',
    updated_at: '2018-10-06T23:14:25.294Z',
  },
];
describe('Tests requests reducer for users', () => {
  it('should return the created request', () => {
    expect(requestsReducer({}, { type: USER_CREATE_REQUEST_SUCCESSFUL, request })).toEqual({
      currentRequest: request,
    });
  });
  it('should return the fetched request', () => {
    expect(requestsReducer({}, { type: USER_GET_REQUEST_SUCCESSFUL, request })).toEqual({
      currentRequest: request,
    });
  });
  it('should return all fetched requests', () => {
    expect(requestsReducer({}, { type: USER_GET_ALL_REQUESTS_SUCCESSFUL, requests })).toEqual({
      requests,
    });
  });
  it('should return errors for failed get request', () => {
    const errors = {
      message: 'No request with the supplied id found',
    };
    expect(requestsReducer({}, { type: USER_GET_REQUEST_FAILED, errors }))
      .toEqual({
        errors,
        currentRequest: {},
      });
  });
  it('should return errors for failed create request', () => {
    const errors = {
      message: 'No request with the supplied id found',
    };
    expect(requestsReducer({}, { type: USER_CREATE_REQUEST_FAILED, errors }))
      .toEqual({
        errors,
      });
  });
  it('should return errors for failed get all requests', () => {
    const errors = {
      message: 'No request with the supplied id found',
    };
    expect(requestsReducer({}, { type: USER_GET_ALL_REQUESTS_FAILED, errors }))
      .toEqual({
        errors,
      });
  });
  it('should return default user request state if invalid type is sent', () => {
    expect(requestsReducer({
      default: 'anything at all',
    },
    {
      type: 'USER_UNKNOWN',
      requests: {
        one: 1,
        zero: 'like seriously?',
      },
    }))
      .toEqual({ default: 'anything at all' });
  });
});

describe('Tests requests reducer for admins', () => {
  it('should return the fetched request', () => {
    expect(requestsReducer({}, { type: ADMIN_GET_REQUEST_SUCCESSFUL, request })).toEqual({
      currentRequest: request,
    });
  });
  it('should return the updated request', () => {
    expect(requestsReducer({}, { type: ADMIN_UPDATE_REQUEST_SUCCESSFUL, request })).toEqual({
      currentRequest: request,
    });
  });
  it('should return all fetched requests', () => {
    expect(requestsReducer({}, { type: ADMIN_GET_ALL_REQUESTS_SUCCESSFUL, requests })).toEqual({
      requests,
    });
  });
  it('should return errors for failed get request', () => {
    const errors = {
      message: 'No request with the supplied id found',
    };
    expect(requestsReducer({}, { type: ADMIN_GET_REQUEST_FAILED, errors }))
      .toEqual({
        errors,
        currentRequest: {},
      });
  });
  it('should return errors for failed update request', () => {
    const errors = {
      message: 'No request with the supplied id found',
    };
    expect(requestsReducer({}, { type: ADMIN_UPDATE_REQUEST_FAILED, errors }))
      .toEqual({
        errors,
      });
  });
  it('should return errors for failed get all requests', () => {
    const errors = {
      message: 'No request with the supplied id found',
    };
    expect(requestsReducer({}, { type: ADMIN_GET_ALL_REQUESTS_FAILED, errors }))
      .toEqual({
        errors,
      });
  });
  it('should return default user request state if invalid type is sent', () => {
    expect(requestsReducer({
      default: 'anything at all',
    },
    {
      type: 'ADMIN_UNKNOWN',
      requests: {
        one: 1,
        zero: 'like seriously?',
      },
    }))
      .toEqual({ default: 'anything at all' });
  });
});

describe('Tests requests reducer defaults', () => {
  it('should clear errors on route change', () => {
    const errors = {
      email: ['email field is required'],
    };
    expect(requestsReducer({ many: 'things in the state' }, {
      type: '@@router/LOCATION_CHANGE',
      errors,
    }))
      .toEqual({
        many: 'things in the state',
        errors: {},
      });
  });
  it('should return default state if invalid type is sent', () => {
    expect(requestsReducer({}, { type: 'UNKNOWN' }))
      .toEqual({});
  });
});
