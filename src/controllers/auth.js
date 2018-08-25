import bcrypt from 'bcrypt';
import { querySingle } from '../database/queries/query';
import { createToken } from '../middlewares/tokenHandler';

export const signUp = (req, res) => {
  const {
    email, firstName, lastName, password,
  } = req.body;
  const query = {
    text: 'INSERT INTO users (email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *',
    values: [email, firstName, lastName, bcrypt.hashSync(password, 8)],
  };
  querySingle({ text: 'SELECT * FROM users WHERE email=($1)', values: [email] })
    .then((response) => {
      if (response) {
        return res.status(400).send({
          Error: 'The email provided is already registered. Please try again',
        });
      }
      return querySingle(query, res)
        .then((data) => {
          if (data.id) {
            const { id, role, created_at: createdAt } = data;
            const user = {
              id, role, firstName, lastName, createdAt,
            };
            const token = createToken(user);
            res.status(201).send({ token, user });
          }
        });
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
        if (!bcrypt.compareSync(password, request.password)) {
          return res.status(401).send(unauthenticatedError);
        }
        const {
          id, role, first_name: firstName, last_name: lastName, created_at: createdAt,
        } = request;
        const user = {
          id, role, firstName, lastName, createdAt,
        };
        const token = createToken(user);
        return res.send({ token, user });
      }
      return res.status(401).send(unauthenticatedError);
    });
};
