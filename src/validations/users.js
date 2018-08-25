import required from './required';
import handleErrors from './errors';

/* eslint-disable no-useless-escape */
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const alphaRegex = /[A-Z][a-z]/;

export const validateSignUp = (req, res, next) => {
  const errors = {};
  // Checks that all fields are present
  // regex gotten from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const field = ['firstName', 'lastName', 'email', 'password', 'passwordConfirmation'];
  const user = required(req, res, field);
  const {
    firstName, lastName, email, password, passwordConfirmation,
  } = user;

    // Validate each field
  if (firstName.length < 3 || !alphaRegex.test(firstName)) errors.firstName = 'must be string and at least three characters';
  if (lastName.length < 3 || !alphaRegex.test(lastName)) errors.lastName = 'must be string and at least three characters';
  if (!emailRegex.test(email)) errors.email = 'must be a valid email';
  if (password.length < 6) errors.password = 'must be at least six characters';
  if (password !== passwordConfirmation) errors.passwordConfirmation = 'must match password';
  handleErrors(errors, res, next);
};

export const validateLogin = (req, res, next) => {
  const errors = {};
  // Checks that all fields are present
  const field = ['email', 'password'];
  const user = required(req, res, field);
  const { email, password } = user;

  /* eslint-disable no-useless-escape */
  // regex gotten from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!emailRegex.test(email)) errors.email = 'must be a valid email';
  if (password.length < 6) errors.password = 'must be at least six characters';
  handleErrors(errors, res, next);
};
