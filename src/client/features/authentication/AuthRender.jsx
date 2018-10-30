import React from 'react';
import PropTypes from 'prop-types';

import Forms from '../../shared/components/Form';

const AuthRender = ({ self }) => {
  const {
    props: properties,
    handleChange,
    handleSubmit,
    state,
    action,
  } = self;
  const { errors } = properties;
  const isLogin = action === 'Login';
  const formLinks = {
    label: isLogin ? "Don't have an account?" : 'Already Registered?',
    link: isLogin ? 'signup' : 'login',
    text: isLogin ? 'Create One' : 'Login',
  };
  return (
    <Forms
      handleInputChange={handleChange}
      inputs={state}
      handleSubmit={handleSubmit}
      errors={errors}
      formLinks={formLinks}
      formTitle={isLogin ? 'Log into your Account' : 'Create an Account'}
    />
  );
};

AuthRender.propTypes = {
  self: PropTypes.shape({}).isRequired,
};

export default AuthRender;
