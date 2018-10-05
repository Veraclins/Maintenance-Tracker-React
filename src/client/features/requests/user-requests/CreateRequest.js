import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import toastr from 'toastr';

import { createRequest } from './userRequestsAction';
import { clearValidationErrors } from '../requestsAction';

import Form from '../../../shared/components/Form';
import history from '../../../shared/utilities/history';

const options = [
  { value: '', label: 'Select Device Type' },
  { value: 'Laptop', label: 'Laptop Pc' },
  { value: 'Desktop', label: 'Desktop Pc' },
  { value: 'Smartphone', label: 'Smartphone' },
  { value: 'Tablet', label: 'Tablet Pc' },
  { value: 'Others', label: 'Others' },
];
/**
 * @class Handles Account verification
 * @requires react
 * @requires react-redux
 * @requires prop-types
 * @requires query-string
 * @requires VerifyAccount
 * @requires verifyAccountActions
 * @requires AH_LOGO
 */
export class CreateRequest extends Component {
  constructor() {
    super();
    this.state = {
      input: {
        title: {
          value: '',
          placeholder: 'Enter the title of the request',
          required: true,
        },
      },
      select: {
        device: {
          options,
          placeholder: 'Select your device type',
          required: true,
          value: '',
        },
      },
      textArea: {
        description: {
          value: '',
          required: true,
          placeholder: 'Enter the description of the request',
        },
      },
    };
  }

  /**
   * @description Handles the text change for input fields
   * @param {Object} event The event object
   */
  handleInputChange = (event) => {
    const { clearValidation, errors } = this.props;
    const { input } = this.state;
    const { type, required, placeholder } = input[event.target.name];
    this.setState({
      input: {
        [event.target.name]: {
          type,
          required,
          placeholder,
          value: event.target.value,
        },
      },
    });
    if (errors[event.target.name]) clearValidation([event.target.name]);
  }

  /**
   * @description Handles the text change for input fields
   * @param {Object} event The event object
   */
  handleTextAreaChange = (event) => {
    const { clearValidation, errors } = this.props;
    const { textArea } = this.state;
    const { required, placeholder } = textArea[event.target.name];
    this.setState({
      textArea: {
        [event.target.name]: {
          required,
          placeholder,
          value: event.target.value,
        },
      },
    });
    if (errors[event.target.name]) clearValidation([event.target.name]);
  }

  /**
   * @description Handles changes for select fields
   * @param {Object} event The event object
   */
  handleSelectChange = (event) => {
    const { clearValidation, errors } = this.props;
    const { select } = this.state;
    const { required, placeholder } = select[event.target.name];
    this.setState({
      select: {
        [event.target.name]: {
          options,
          required,
          placeholder,
          value: event.target.value,
        },
      },
    });
    if (errors[event.target.name]) clearValidation([event.target.name]);
  }

  /**
   * @description Handles the form submit
   * @param {Object} event The event object
   * @returns {Object}
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      create,
      user,
      isLoggedIn,
      location,
    } = this.props;
    const {
      input,
      select,
      textArea,
    } = this.state;
    if (!isLoggedIn) {
      toastr.error('You must be logged to make a request');
      return history.push('/login', { from: location.pathname });
    }
    return create({
      title: input.title.value,
      device: select.device.value,
      description: textArea.description.value,
    }, user);
  }

  /**
   * @description Renders the component on a DOM node
   */
  render() {
    const { errors } = this.props;
    const { input, select, textArea } = this.state;
    return (
      <Form
        handleInputChange={this.handleInputChange}
        handleSelectChange={this.handleSelectChange}
        handleTextAreaChange={this.handleTextAreaChange}
        inputs={input}
        selects={select}
        textAreas={textArea}
        handleSubmit={this.handleSubmit}
        errors={errors}
        formTitle="Make a Request"
      />
    );
  }
}

CreateRequest.propTypes = {
  clearValidation: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
  create: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
};

CreateRequest.defaultProps = {
  errors: {},
};

const mapDispatchToProps = dispatch => ({
  create: (request, user) => dispatch(createRequest(request, user)),
  clearValidation: field => dispatch(clearValidationErrors(field)),
});

const mapStateToProps = state => ({
  errors: state.requests.errors,
  user: state.auth.user,
  isLoggedIn: state.auth.isAuthenticated,
  location: state.router.location,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);
