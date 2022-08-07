import React from "react";

export interface IFormInput {
  id: string;
  inputType: string;
  label: string;
  name: string;
  placeholder?: string;
  valueInit?: string;
  valueCheckedInit?: boolean;
}

interface IFormProps {
  inputs: IFormInput[];
  ButtonFinish: React.ReactNode;
  onSubmit: Function;
}

const Form: React.FC<IFormProps> = ({ inputs, ButtonFinish, onSubmit }) => {
  const [states, setStates] = React.useState<any>({} as any);

  const onChangeInput = (type: string, input: any) => {
    const { name } = input;

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

  React.useEffect(() => {
    if (inputs && inputs.length > 0) {
      inputs.forEach((input) => {
        if (input.inputType === "checkbox") {
          setStates((prevState: any) => ({
            ...prevState,
            [input.name]: input.valueCheckedInit ?? false,
          }));
        } else {
          setStates((prevState: any) => ({
            ...prevState,
            [input.name]: input.valueInit ?? "",
          }));
        }
      });
    }
  }, [inputs]);

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
        </div>
      ))}
      {ButtonFinish}
    </form>
  );
};

export default Form;
