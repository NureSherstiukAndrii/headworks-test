import PropTypes from "prop-types";

import "./index.scss";

const Select = ({
  name,
  options,
  onChange,
  defaultValue = "",
  className = "",
}) => (
  <label className={`select ${className}`}>
    <select name={name} onChange={onChange} defaultValue={defaultValue}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
};

export default Select;
