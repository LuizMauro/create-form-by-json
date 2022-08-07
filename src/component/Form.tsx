import React, { HTMLInputTypeAttribute, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputComponent } from "./Input";
import { SelectComponent } from "./Select";

interface IOptionsSelect {
  value: string;
  label: string;
}
export interface IFormInput {
  id: string;
  inputType: HTMLInputTypeAttribute | "select";
  label: string;
  name: string;
  placeholder?: string;
  valueInit?: string | boolean;
  options?: IOptionsSelect[];
}

interface IFormProps {
  inputs: IFormInput[];
  validationScheam: Yup.AnyObjectSchema;
  onSubmit: Function;
}

const FormComponent: React.FC<IFormProps> = ({
  inputs,
  validationScheam,
  onSubmit,
}) => {
  const refForm = React.useRef<any>(null);
  const [states, setStates] = React.useState<any>();

  const setInitValues = React.useCallback(() => {
    let initValues = {};
    inputs.forEach((input) => {
      initValues = { ...initValues, [input.name]: input.valueInit ?? "" };
    });

    setStates(initValues);
  }, [inputs]);

  useEffect(() => {
    if (inputs.length > 0) {
      setInitValues();
    }
  }, [inputs, setInitValues]);

  const onFormSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <Formik
      innerRef={refForm}
      validationSchema={validationScheam}
      validateOnChange={true}
      onSubmit={onFormSubmit}
      initialValues={states}
      enableReinitialize={true}
    >
      <Form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: 10,
        }}
      >
        {inputs.map((item) => (
          <div key={item.id}>
            {item.inputType === "select" &&
            item.options &&
            item.options.length > 0 ? (
              <SelectComponent
                label={item.label}
                type={item.inputType}
                name={item.name}
                placeholder={item.placeholder ?? ""}
                options={item?.options}
              />
            ) : (
              <InputComponent
                label={item.label}
                type={item.inputType}
                name={item.name}
                placeholder={item.placeholder ?? ""}
              />
            )}
          </div>
        ))}
        <button type="submit">Enviar</button>
      </Form>
    </Formik>
  );
};

export { FormComponent };
