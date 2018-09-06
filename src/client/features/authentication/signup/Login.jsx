import React from 'react';
import { PropTypes } from 'prop-types';

const Login = ({ handleChange, handleSubmit }) => (
  <div className="container my-4">
    <form className="form-signin" onSubmit={handleSubmit}>
      <h2 className="form-signin-heading">Please sign in</h2>
      <input onChange={handleChange} type="email" id="email" className="form-control" placeholder="Email address" required />
      <br />
      <input onChange={handleChange} type="password" id="password" className="form-control" placeholder="Password" required />
      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
);

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Login;
