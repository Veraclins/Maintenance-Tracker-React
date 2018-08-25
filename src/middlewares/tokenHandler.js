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
export const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  try {
    if (!token) {
      res.status(400).send({ Error: 'You must supply an access token' });
    } else {
      await jwt.verify(token, secret, (err, decoded) => {
        if (decoded) {
          const { id } = decoded;
          req.user = { id };
          next();
        } else {
          res.status(401).send({ Error: 'Your access is invalid or expired. Please login again' });
        }
      });
    }
  } catch (err) {
    next(err);
  }
};
