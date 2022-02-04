import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
const MultiSelectField = ({ options, onChange, name, label }) => {
    // console.log(name);
    // console.log(options);
    // console.log(label);
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName].id
              }))
            : options;
    const handleChange = (value) => {
        console.log(value);
        onChange({ name: name, value });
        // console.log(onChange);
    };
    return (
        <div className="mb-4">
            <label> {label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string
};
export default MultiSelectField;
