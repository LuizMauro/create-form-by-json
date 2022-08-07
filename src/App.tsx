import Form, { IFormInput } from "./component/Form";

const inputs: IFormInput[] = [
  {
    id: "InputName",
    inputType: "text",
    label: "Seu Nome",
    name: "name",
    placeholder: "Digite seu name",
  },
  {
    id: "IputEmail",
    inputType: "email",
    label: "Seu E-mail",
    name: "email",
    placeholder: "Digite seu E-mail",
  },
  {
    id: "InputDateNasc",
    inputType: "date",
    label: "Data de nascimento",
    name: "date",
  },
  {
    id: "InputCheckbox",
    inputType: "checkbox",
    label: "Receber notificações?",
    name: "notification",
  },
];

function App() {
  return (
    <Form
      inputs={inputs}
      ButtonFinish={<button type="submit">Enviar</button>}
      onSubmit={(values: any) => console.log(values)}
    />
  );
}

export default App;
