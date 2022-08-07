import React from "react";
import { Field, useField } from "formik";

interface IProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

const InputComponent: React.FC<IProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: 300,
        margin: 10,
      }}
    >
      <label> {label}: </label>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Field {...field} {...props} />
        <span style={{ color: "red" }}>{meta.error}</span>
      </div>
    </div>
  );
};

export { InputComponent };
