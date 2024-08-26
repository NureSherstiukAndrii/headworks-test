import { Field } from "react-final-form";
import PropTypes from "prop-types";

import "./index.scss";

const FormField = ({ name, validators, type, placeholder, min }) => (
  <Field name={name} validate={validators}>
    {({ input, meta }) => (
      <div className="form-block">
        <input
          {...input}
          name={name}
          placeholder={placeholder}
          className="form-block__input"
          type={type}
          min={min}
        />

        {meta.error && meta.touched && <span>{meta.error}</span>}
      </div>
    )}
  </Field>
);

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  validators: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  min: PropTypes.string,
};

export default FormField;
