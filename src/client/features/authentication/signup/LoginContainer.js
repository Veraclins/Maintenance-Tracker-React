import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Login from './Login';
import { login } from '../AuthAction';

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, login: loginUser } = this.props;
    const { email, password } = this.state;
    loginUser({ email, password });
    this.setState({ email: '', password: '' });
    history.push('/');
  }

  render() {
    return (
      <Login handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    );
  }
}


const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
});

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};
export default connect(null, mapDispatchToProps)(LoginContainer);
