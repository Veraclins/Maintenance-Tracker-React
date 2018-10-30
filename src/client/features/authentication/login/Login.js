import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { clearValidationErrors, loginUser } from '../authAction';
import { handleInputChange } from '../authHelper';
import AuthRender from '../AuthRender';

/**
 * @class Handles user login into the application
 */
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: {
        type: 'email',
        value: '',
        placeholder: 'Enter your email',
        required: true,
      },
      password: {
        type: 'password',
        value: '',
        placeholder: 'Enter your password',
        required: true,
      },
    };
  }

  /**
   * @description Handles the text change for input fields
   * @param {Object} event The event object
   */
  handleChange = (event) => {
    const newState = handleInputChange(event, this.state, this.props);
    this.setState(newState);
  }


  /**
   * @description Handles the form submit
   * @param {Object} event The event object
   * @returns {Object}
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const { login, location } = this.props;
    const { email: emailObject, password: passwordObject } = this.state;
    const password = passwordObject.value;
    const email = emailObject.value;
    login({ email, password }, location);
  }

  /**
   * @description Renders the component on a DOM node
   */
  render() {
    this.action = 'Login';
    return (
      <AuthRender self={this} />
    );
  }
}


Login.propTypes = {
  location: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
};

Login.defaultProps = {
  errors: {},
};

export const mapDispatchToProps = dispatch => ({
  login: (user, location) => dispatch(loginUser(user, location)),
  clearValidation: field => dispatch(clearValidationErrors(field)),
});

export const mapStateToProps = state => ({
  errors: state.auth.errors,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
