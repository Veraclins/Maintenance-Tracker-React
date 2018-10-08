import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import DInput from './Input';
import DSelectInput from './Select';
import DTextArea from './TextArea';

export const Form = ({
  inputs,
  handleInputChange,
  handleSelectChange,
  handleTextAreaChange,
  handleSubmit,
  formTitle,
  errors,
  selects,
  textAreas,
  formLinks,
}) => (
  <div className="form_container">
    <div className="white-popup">
      <div className="hbspt-form-title">
        <h3><strong>{formTitle}</strong></h3>
      </div>
      <div className="hbspt-form-container">
        <form
          className="hs-form stacked"
          onSubmit={handleSubmit}
        >
          {Object.entries(inputs).map(([input, value]) => (
            <DInput
              inputLabel={`${input[0].toUpperCase()}${input.slice(1)}`}
              type={value.type}
              name={input}
              required={value.required}
              key={input}
              placeholder={value.placeholder}
              error={errors[input]}
              value={value.value}
              handleChange={handleInputChange}
            />
          ))}
          {Object.entries(selects).map(([select, value]) => (
            <DSelectInput
              inputLabel={`${select[0].toUpperCase()}${select.slice(1)}`}
              name={select}
              required={value.required}
              error={errors[select]}
              placeholder={value.placeholder}
              key={select}
              value={value.value}
              options={value.options}
              handleChange={handleSelectChange}
            />
          ))}
          {Object.entries(textAreas).map(([textArea, value]) => (
            <DTextArea
              inputLabel={`${textArea[0].toUpperCase()}${textArea.slice(1)}`}
              name={textArea}
              required={value.required}
              error={errors[textArea]}
              placeholder={value.placeholder}
              value={value.value}
              key={textArea}
              handleChange={handleTextAreaChange}
            />
          ))}
          <div className="hs-submit">
            <div className="actions">
              <input
                type="submit"
                value="Submit"
                className="hs-button primary large"
              />
            </div>
          </div>
          {formLinks.link
            ? (
              <div className="form_links">
                <p>{formLinks.label} <Link to={formLinks.link}>{formLinks.text}</Link></p>
              </div>
            ) : false}
        </form>
      </div>
    </div>
  </div>
);

Form.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func,
  handleTextAreaChange: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  formTitle: PropTypes.string.isRequired,
  errors: PropTypes.shape({}).isRequired,
  selects: PropTypes.shape({}),
  textAreas: PropTypes.shape({}),
  inputs: PropTypes.shape({}).isRequired,
  formLinks: PropTypes.shape({}),
};

Form.defaultProps = {
  selects: {},
  textAreas: {},
  formLinks: {},
  handleSelectChange: () => null,
  handleTextAreaChange: () => null,
};
export default Form;
