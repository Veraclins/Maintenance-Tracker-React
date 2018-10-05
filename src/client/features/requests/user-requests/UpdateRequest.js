import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import toastr from 'toastr';

import { updateRequest, getSingleRequest } from './userRequestsAction';
import { clearValidationErrors } from '../requestsAction';

import Form from '../../../shared/components/Form';
import history from '../../../shared/utilities/history';

const options = [
  { value: 'Laptop', label: 'Laptop Pc', className: 'hs-input' },
  { value: 'Desktop', label: 'Desktop Pc', className: 'hs-input' },
  { value: 'Smartphone', label: 'Smartphone', className: 'hs-input' },
  { value: 'Tablet', label: 'Tablet Pc', className: 'hs-input' },
  { value: 'Others', label: 'Others', className: 'hs-input' },
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
      toastr.error('You must be logged to rate an article');
      return history.push('/login', { from: location.pathname });
    }
    const { params } = match;
    return fetch(user, params.requestId);
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
      update,
      user,
      isLoggedIn,
      location,
      request,
      match,
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
    const updatedRequest = {
      title: input.title.value || request.title,
      device: select.device.value || request.device,
      description: textArea.description.value || request.description,
    };
    updatedRequest.id = match.params.requestId;
    return update(updatedRequest, user);
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
      <Form
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
  update: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  request: PropTypes.shape({}).isRequired,
};

UpdateRequest.defaultProps = {
  errors: {},
};

const mapDispatchToProps = dispatch => ({
  update: (request, user) => dispatch(updateRequest(request, user)),
  fetch: (user, requestId) => dispatch(getSingleRequest(user, requestId)),
  clearValidation: field => dispatch(clearValidationErrors(field)),
});

const mapStateToProps = state => ({
  errors: state.requests.errors,
  user: state.auth.user,
  request: state.requests.currentRequest,
  isLoggedIn: state.auth.isAuthenticated,
  location: state.router.location,
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequest);
