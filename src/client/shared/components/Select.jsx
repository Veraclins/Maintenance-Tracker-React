
import React from 'react';
import { PropTypes } from 'prop-types';

const SelectInput = ({
  name,
  handleChange,
  placeholder,
  inputLabel,
  required,
  value,
  options,
}) => (
  <React.Fragment>
    <div className="field hs-form-field">
      <label className="hs-form-label" htmlFor={name}>
        <span>{inputLabel}{' '}</span>
        {required ? <span className="hs-form-required">*</span> : false}
      </label>
      <div className="input">
        <select
          className="hs-input"
          name={name}
          value={value}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
        >
          {options.map(option => (
            <option value={option.value} key={option.label}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  </React.Fragment>
);

SelectInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  required: PropTypes.bool.isRequired,
  inputLabel: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectInput;
