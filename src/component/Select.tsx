import React from "react";
import { Field, useField } from "formik";

interface IOptionsSelect {
  value: string;
  label: string;
}

interface IProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  options: IOptionsSelect[];
}

const SelectComponent: React.FC<IProps> = ({ label, options, ...props }) => {
  const [field, meta] = useField(props as any);

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
        <Field as={"select"} {...field} {...props}>
          {options?.length &&
            options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
        </Field>
        <span style={{ color: "red" }}>{meta.error}</span>
      </div>
    </div>
  );
};

export { SelectComponent };
