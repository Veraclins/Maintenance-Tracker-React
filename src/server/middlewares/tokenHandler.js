import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
export function createToken(user) {
  const { id } = user;
  const token = jwt.sign({ id }, secret, {
    expiresIn: 259200, // expires in 72 hours
  });
  return token;
}

/* eslint-disable consistent-return */
export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({
      status: 'error',
      message: 'You must supply an access token',
    });
  }
  return jwt.verify(token, secret, (err, decoded) => {
    if (decoded) {
      const { id } = decoded;
      req.user = { id };
      return next();
    }
    return res.status(401).send({
      status: 'error',
      message: 'Your access is invalid or expired. Please login again',
    });
  });
};
