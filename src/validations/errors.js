function handleErrors(errors, res, next) {
  if (Object.keys(errors).length !== 0) {
    res.status(400).send({ Error: 'Validation error(s)', errors });
  } else {
    next();
  }
}


export default handleErrors;
