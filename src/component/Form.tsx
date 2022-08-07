import React, { HTMLInputTypeAttribute } from "react";

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
  validation?: (e: string) => { error: boolean; message?: string } | any;
}

interface IFormProps {
  inputs: IFormInput[];
  onSubmit: Function;
}

const Form: React.FC<IFormProps> = ({ inputs, onSubmit }) => {
  const [states, setStates] = React.useState<any>({} as any);
  const [errors, setErrors] = React.useState<any>({} as any);

  const interceptorValidation = (name: string, value: string) => {
    const validationInput = inputs.find((i) => i.name === name && i.validation);

    if (validationInput && validationInput.validation) {
      const resp = validationInput?.validation(value);

      if (resp?.error && resp?.message) {
        setErrors({ ...errors, [name]: resp.message });
      } else {
        const err = errors;
        delete err[name];
        setErrors(err);
      }
    }
  };

  const onChangeInput = (type: string, input: any) => {
    const { name } = input;

    interceptorValidation(name, input.value);

    if (type === "checkbox") {
      setStates((prevState: any) => ({ ...prevState, [name]: input.checked }));
    } else {
      setStates((prevState: any) => ({ ...prevState, [name]: input.value }));
    }
  };

  const interceptorOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(states);
  };

  const setInitValues = React.useCallback(() => {
    inputs.forEach((input) => {
      if (input.inputType === "checkbox") {
        setStates((prevState: any) => ({
          ...prevState,
          [input.name]: input.valueInit ?? false,
        }));
      } else {
        setStates((prevState: any) => ({
          ...prevState,
          [input.name]: input.valueInit ?? "",
        }));
      }
    });
  }, [inputs]);

  React.useEffect(() => {
    if (inputs && inputs.length > 0) {
      setInitValues();
    }
  }, [inputs, setInitValues]);

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 10,
      }}
      onSubmit={interceptorOnSubmit}
    >
      {inputs.map((item) => (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: 300,
              margin: 10,
            }}
            key={item.id}
          >
            <label> {item.label}: </label>

            {item.inputType === "select" ? (
              <select name={item.name} value={states[item.name]}>
                {item.options?.length &&
                  item.options.map((option) => (
                    <option
                      onChange={(e) => onChangeInput(item.inputType, e.target)}
                      key={option.label}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                type={item.inputType}
                name={item.name}
                placeholder={item.placeholder}
                onChange={(e) => onChangeInput(item.inputType, e.target)}
                value={states[item.name]}
                {...(item.inputType === "checkbox" && {
                  checked: states[item.name],
                })}
              />
            )}
          </div>
          <span style={{ color: "red" }}>{errors[item.name]}</span>
        </>
      ))}
      <button type="submit" disabled={Object.values(errors).length > 0}>
        Enviar
      </button>
    </form>
  );
};

export default Form;
