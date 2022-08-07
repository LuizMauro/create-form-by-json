import Form, { IFormInput } from "./component/Form";

const inputs: IFormInput[] = [
  {
    id: "InputName",
    inputType: "text",
    label: "Seu Nome",
    name: "name",
    placeholder: "Digite seu name",
    validation: (e) => {
      if (e.length <= 3) {
        return {
          error: true,
          message: "invalid",
        };
      }
    },
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
    valueInit: true,
  },

  {
    id: "SelectTeste",
    inputType: "select",
    label: "Escolha uma opção",
    name: "option",
    valueInit: "Option2",
    options: [
      {
        label: "Option1",
        value: "Option1",
      },
      {
        label: "Option2",
        value: "Option2",
      },
    ],
  },
];

function App() {
  return (
    <>
      <Form inputs={inputs} onSubmit={(values: any) => console.log(values)} />
    </>
  );
}

export default App;
