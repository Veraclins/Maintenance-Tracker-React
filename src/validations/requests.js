import required from './required';
import handleErrors from './errors';

const alphaRegex = /[A-Z][a-z]/;
const paraRegex = /[A-Za-z0-9\s_.,!"()?@'/$]*/;

const validateRequest = (req, res, next) => {
  const errors = {};
  // Checks that all fields are present
  const field = ['title', 'device', 'description'];
  const request = required(req, res, field);
  const {
    title, device, description,
  } = request;

  // Validate each field
  if (title.length < 10 || !alphaRegex.test(title)) errors.title = 'must be string and at least 10 characters long';
  if (!alphaRegex.test(device)) errors.device = 'must be a string';
  if (description.length < 20 || !paraRegex.test(description)) errors.description = 'must be at least 20 characters long';
  handleErrors(errors, res, next);
};

export default validateRequest;
