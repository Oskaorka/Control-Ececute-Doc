import React from "react";
const FormField = ({
  name,
  value,
  onChange,
  styleInput,
  nameLabel,
  description,
}) => {
  return (
    <div
      // style={{ width: "15%" }}
      className="d-flex flex-column-reverse align-items-center m-2"
    >
      {/* className="d-flex flex-column align-items-center p-4 mt-5" */}

      <input
        className="p-1"
        style={styleInput}
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={description}
      />
      <label
        style={{ fontSize: "20px", color: "grey" }}
        className="mb-3"
        htmlFor={name}
      >
        {nameLabel}
      </label>
    </div>
  );
};

export default FormField;
