
import React from 'react';
import { PropTypes } from 'prop-types';

const Input = ({
  type,
  name,
  value,
  handleChange,
  inputLabel,
  required,
  error,
  placeholder,
}) => (
  <React.Fragment>
    <div className="field hs-form-field">
      <label className="hs-form-label" htmlFor={name}>
        <span>{inputLabel}{' '}</span>
        {required ? <span className="hs-form-required">*</span> : false}
      </label>
      <div className="input">
        <input
          className="hs-input"
          type={type}
          name={name}
          required={required}
          value={value}
          placeholder={placeholder}
          autoComplete="on"
          onChange={handleChange}
        />
      </div>
      {error
        ? (
          <ul className="hs-error-msgs inputs-list">
            <li>
              <label>{error}</label>
            </li>
          </ul>
        ) : false}
    </div>
  </React.Fragment>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  inputLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  required: false,
  error: '',
  type: 'text',
};

export default Input;
