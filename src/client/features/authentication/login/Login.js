import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { clearValidationErrors, loginUser } from '../authAction';

import Forms from '../../../shared/components/Form';
import { handleInputChange } from '../authHelper';

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
    const { clearValidation, errors } = this.props;
    const newState = handleInputChange(event, this.state);
    this.setState(newState);
    if (errors[event.target.name]) clearValidation(event.target.name);
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
    const { errors } = this.props;
    const formLinks = {
      label: "Don't have an account?",
      link: '/signup',
      text: 'Create one',
    };
    return (
      <Forms
        handleInputChange={this.handleChange}
        inputs={this.state}
        handleSubmit={this.handleSubmit}
        errors={errors}
        formLinks={formLinks}
        formTitle="Log into Your Account"
      />
    );
  }
}


Login.propTypes = {
  clearValidation: PropTypes.func.isRequired,
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
