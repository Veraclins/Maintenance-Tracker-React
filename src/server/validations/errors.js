const handleErrors = (errors, res, next) => {
  if (Object.keys(errors).length !== 0) {
    return res.status(400).send({
      status: 'error',
      message: 'Validation error(s)',
      errors,
    });
  }
  return next();
};


export default handleErrors;
