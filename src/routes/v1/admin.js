import { Router } from 'express';
import { adminGetAllRequests, approveRequest, disapproveRequest, resolveRequest } from '../../controllers/admin';

const adminRoute = Router();

// Used for routes that start with /api/v1/requests
// /api/v1/requests is already prepended to the route
// Thes routes are only available to the admin(s)


adminRoute.get('/', adminGetAllRequests);

adminRoute.put('/:requestId/approve', approveRequest);

adminRoute.put('/:requestId/disapprove', disapproveRequest);

adminRoute.put('/:requestId/resolve', resolveRequest);


export default adminRoute;
