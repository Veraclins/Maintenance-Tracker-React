import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import signUpUser from './signUpAction';
import { clearValidationErrors } from '../authAction';

import Form from '../../../shared/components/Form';

/**
 * @class Handles Account registration
 */
export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      first_name: {
        type: 'text',
        value: '',
        placeholder: 'Enter your first name',
        required: true,
      },
      last_name: {
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
    const { clearValidation, errors } = this.props;
    const type = this.state[event.target.name].type; // eslint-disable-line
    const { required, placeholder } = this.state[event.target.name]; // eslint-disable-line
    this.setState({
      [event.target.name]: {
        type,
        required,
        placeholder,
        value: event.target.value,
      },
    });
    if (errors[event.target.name]) clearValidation(event.target.name);
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
      first_name,
      last_name,
      password,
      passwordConfirmation,
    } = this.state;
    signup({
      email: email.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
      passwordConfirmation: passwordConfirmation.value,
    }, location);
  }

  /**
   * @description Renders the component on a DOM node
   */
  render() {
    const { errors } = this.props;
    const formLinks = {
      label: 'Already Registered?',
      link: '/login',
      text: 'Login',
    };
    return (
      <Form
        handleInputChange={this.handleChange}
        inputs={this.state}
        handleSubmit={this.handleSubmit}
        errors={errors}
        formLinks={formLinks}
        formTitle="Create an Account"
      />
    );
  }
}


SignUp.propTypes = {
  clearValidation: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  signup: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
};

SignUp.defaultProps = {
  errors: {},
};

const mapDispatchToProps = dispatch => ({
  signup: (user, location) => dispatch(signUpUser(user, location)),
  clearValidation: field => dispatch(clearValidationErrors(field)),
});

const mapStateToProps = state => ({
  errors: state.auth.errors,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
