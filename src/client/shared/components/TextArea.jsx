
import React from 'react';
import { PropTypes } from 'prop-types';

const TextArea = ({
  name, value, handleChange, inputLabel, required, error, placeholder,
}) => (
  <React.Fragment>
    <div className="field hs-form-field">
      <label className="hs-form-label" htmlFor={name}>
        <span>{inputLabel}{' '}</span>
        {required ? <span className="hs-form-required">*</span> : false}
      </label>
      <div className="input">
        <textarea
          className="hs-input"
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

TextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  inputLabel: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
  required: false,
  error: '',
};

export default TextArea;
