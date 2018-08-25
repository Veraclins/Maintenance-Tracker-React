function required(req, res, requiredInput) {
  const errors = {};
  const input = {};

  // Removes empty spaces
  Object.entries(req.body).forEach(([key, value]) => {
    input[key] = value.toString().trim();
  });
  // Checks that all fields are present
  requiredInput.forEach((element) => {
    if (!(element in input)) {
      errors[element] = `${element} is required`;
    }
  });
  if (Object.keys(errors).length !== 0) {
    res.status(400).send({ Error: 'Validation error(s)', errors });
  }
  return input;
}

export default required;
