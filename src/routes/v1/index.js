import { Router } from 'express';
import usersRoute from './users';
import adminRoute from './admin';
import authRoute from './auth';
import prepTable from '../../controllers/data';
import { verifyToken } from '../../middlewares/tokenHandler';
import isAdmin from '../../middlewares/isAdmin';

const routes = Router();


// Used for routs that start with /api/v1
// /api/v1 is already prepended to the route

routes.all('/', (req, res) => {
  res.send({
    message: 'Welcome to Maintenance Tracker API by Agada Clinton Innocent',
    docs: 'https://veraclins-m-tracker.herokuapp.com/api-docs',
    frontend: 'https://veraclins-m-tracker.herokuapp.com',
  });
});

routes.use('/users', verifyToken, usersRoute);

routes.use('/requests', verifyToken, isAdmin, adminRoute);

routes.use('/auth', authRoute);

routes.use('/data', prepTable);

export default routes;
