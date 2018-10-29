import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import toastr from 'toastr';

import { createRequest } from './userRequestsAction';
import { clearValidationErrors } from '../requestsAction';

import Forms from '../../../shared/components/Form';
import {
  changeInput,
  changeTextArea,
  changeSelect,
  handleRequestSubmit,
} from '../requestHelper';
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

  componentDidMount() {
    const { location, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      toastr.error('You must be logged in to create a request');
      return history.push('/login', { from: location.pathname });
    }
    return true;
  }

  /**
   * @description clears validation errors when you start typing in the input field
   * @param {Object} field The form field
   */
  clearErrors = (field) => {
    const { clearValidation, errors } = this.props;
    if (errors[field]) clearValidation([field]);
  }

  /**
   * @description Handles the text change for input fields
   * @param {Object} event The event object
   */
  handleInputChange = (event) => {
    const newState = changeInput(event, this.state);
    this.setState(newState);
    this.clearErrors([event.target.name]);
  }

  /**
   * @description Handles the text change for text areas
   * @param {Object} event The event object
   */
  handleTextAreaChange = (event) => {
    const newState = changeTextArea(event, this.state);
    this.setState(newState);
    this.clearErrors([event.target.name]);
  }

  /**
   * @description Handles changes for select fields
   * @param {Object} event The event object
   */
  handleSelectChange = (event) => {
    const newState = changeSelect(event, this.state);
    this.setState(newState);
    this.clearErrors([event.target.name]);
  }

  /**
   * @description Handles the form submit
   * @param {Object} event The event object
   * @returns {Object}
   */
  handleSubmit = (event) => {
    const { input, select, textArea } = this.state;
    handleRequestSubmit(event, this.props, {
      title: input.title.value,
      device: select.device.value,
      description: textArea.description.value,
    });
  }

  /**
   * @description Renders the component on a DOM node
   */
  render() {
    const { errors } = this.props;
    const { input, select, textArea } = this.state;
    return (
      <Forms
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
  errors: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
};

CreateRequest.defaultProps = {
  errors: {},
};

export const mapDispatchToProps = dispatch => ({
  create: (request, user) => dispatch(createRequest(request, user)),
  clearValidation: field => dispatch(clearValidationErrors(field)),
});

export const mapStateToProps = state => ({
  errors: state.requests.errors,
  user: state.auth.user,
  isLoggedIn: state.auth.isAuthenticated,
  location: state.router.location,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);
