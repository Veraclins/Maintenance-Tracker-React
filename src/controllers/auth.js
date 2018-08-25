import bcrypt from 'bcrypt';
import { querySingle } from '../database/queries/query';
import { createToken } from '../middlewares/tokenHandler';

export const signUp = (req, res) => {
  const {
    email, firstName, lastName, password,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const query = {
    text: 'INSERT INTO users (email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *',
    values: [email, firstName, lastName, hashedPassword],
  };
  querySingle({ text: 'SELECT * FROM users WHERE email=($1)', values: [email] })
    .then((response) => {
      if (response) {
        res.status(400).send({ Error: 'The email provided is already registered. Please try again' });
      } else {
        querySingle(query, res)
          .then((data) => {
            if (data.id) {
              const { id, role, created_at } = data; // eslint-disable-line camelcase
              const user = {
                id, role, firstName, lastName, createdAt: created_at,
              };
              const token = createToken(user);
              res.status(201).send({ token, user });
            }
          });
      }
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const query = {
    text: 'SELECT * FROM users WHERE email=($1)',
    values: [email],
  };
  const unauthenticatedError = { Error: 'Incorrect details. Please be sure you typed them correctly' };
  querySingle(query)
    .then((request) => { // eslint-disable-line
      if (request) {
        const passwordIsValid = bcrypt.compareSync(password, request.password);
        if (!passwordIsValid) {
          res.status(401).send(unauthenticatedError);
        } else {
          const {
            id, role, first_name, last_name, created_at, // eslint-disable-line
          } = request;
          const user = {
            id, role, firstName: first_name, lastName: last_name, createdAt: created_at,
          };
          const token = createToken(user);
          return res.send({ token, user });
        }
      } else {
        return res.status(401).send(unauthenticatedError);
      }
    });
};
