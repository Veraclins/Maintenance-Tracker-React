import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { clearValidationErrors, signUpUser } from '../authAction';

import { handleInputChange } from '../authHelper';
import AuthRender from '../AuthRender';

/**
 * @class Handles Account registration
 */
export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: {
        type: 'text',
        value: '',
        placeholder: 'Enter your first name',
        required: true,
      },
      lastName: {
        type: 'text',
        value: '',
        placeholder: 'Enter your last name',
        required: true,
      },
      email: {
        type: 'email',
        value: '',
        placeholder: 'Enter your email address',
        required: true,
      },
      password: {
        type: 'password',
        value: '',
        placeholder: 'Enter your password',
        required: true,
      },
      passwordConfirmation: {
        type: 'password',
        value: '',
        placeholder: 'Repeat the password',
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
    const { signup, location } = this.props;
    const {
      email,
      firstName,
      lastName,
      password,
      passwordConfirmation,
    } = this.state;
    signup({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      passwordConfirmation: passwordConfirmation.value,
    }, location);
  }

  /**
   * @description Renders the component on a DOM node
   */
  render() {
    this.action = 'SignUp';
    return (
      <AuthRender self={this} />
    );
  }
}


SignUp.propTypes = {
  location: PropTypes.shape({}).isRequired,
  signup: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
};

SignUp.defaultProps = {
  errors: {},
};

export const mapDispatchToProps = dispatch => ({
  signup: (user, location) => dispatch(signUpUser(user, location)),
  clearValidation: field => dispatch(clearValidationErrors(field)),
});

export const mapStateToProps = state => ({
  errors: state.auth.errors,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
