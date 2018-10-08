import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import toastr from 'toastr';

import { updateRequest, getSingleRequest } from './userRequestsAction';
import { clearValidationErrors } from '../requestsAction';

import Forms from '../../../shared/components/Form';
import history from '../../../shared/utilities/history';
import {
  changeInput,
  changeTextArea,
  changeSelect,
  handleRequestSubmit,
} from '../RequestHelper';

const options = [
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
export class UpdateRequest extends Component {
  constructor(props) {
    super(props);
    const { request } = props;
    this.state = {
      input: {
        title: {
          value: request.title,
          placeholder: 'Enter the title of the request',
          required: true,
        },
      },
      select: {
        device: {
          options,
          placeholder: 'Select your device type',
          required: true,
          value: request.device,
        },
      },
      textArea: {
        description: {
          value: request.description,
          required: true,
          placeholder: 'Enter the description of the request',
        },
      },
    };
  }

  componentDidMount() {
    const {
      match, location, fetch, isLoggedIn, user,
    } = this.props;
    if (!isLoggedIn) {
      toastr.error('You must be logged in to edit a request');
      return history.push('/login', { from: location.pathname });
    }
    const { params } = match;
    return fetch(user, params.requestId);
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
    const { request } = this.props;
    handleRequestSubmit(event, this.props, {
      title: input.title.value || request.title,
      device: select.device.value || request.device,
      description: textArea.description.value || request.description,
    });
  }

  /**
   * @description Renders the component on a DOM node
   */
  render() {
    const { errors, match } = this.props;
    const { input, select, textArea } = this.state;
    const formLinks = {
      label: 'Change your mind?',
      link: `/requests/${match.params.requestId}`,
      text: 'Go back',
    };
    return (
      <Forms
        handleInputChange={this.handleInputChange}
        handleSelectChange={this.handleSelectChange}
        handleTextAreaChange={this.handleTextAreaChange}
        inputs={input}
        selects={select}
        textAreas={textArea}
        formLinks={formLinks}
        handleSubmit={this.handleSubmit}
        errors={errors}
        formTitle="Edit your Request"
      />
    );
  }
}

UpdateRequest.propTypes = {
  clearValidation: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
  fetch: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  request: PropTypes.shape({}).isRequired,
};

UpdateRequest.defaultProps = {
  errors: {},
};

export const mapDispatchToProps = dispatch => ({
  update: (request, user) => dispatch(updateRequest(request, user)),
  fetch: (user, requestId) => dispatch(getSingleRequest(user, requestId)),
  clearValidation: field => dispatch(clearValidationErrors(field)),
});

export const mapStateToProps = state => ({
  errors: state.requests.errors,
  user: state.auth.user,
  request: state.requests.currentRequest,
  isLoggedIn: state.auth.isAuthenticated,
  location: state.router.location,
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequest);
