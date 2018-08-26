import { Router } from 'express';
import { signUp, login } from '../../controllers/auth';
import { validateSignUp, validateLogin } from '../../validations/users';

const authRoute = Router();

// Used for routes that start with /api/v1/auth
// /api/v1/auth is already prepended to the route
// Used for signup and signin


authRoute.post('/signup', validateSignUp, signUp);

authRoute.post('/login', validateLogin, login);

export default authRoute;
