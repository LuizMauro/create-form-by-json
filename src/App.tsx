import { IFormInput, FormComponent } from "./component/Form";
import * as Yup from "yup";

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
    valueInit: false,
  },
  {
    id: "SelectTeste",
    inputType: "select",
    label: "Escolha uma opção",
    name: "option",
    options: [
      {
        label: "",
        value: "",
      },
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

const validationSchema = Yup.object({
  name: Yup.string().required("Campo Obrigatorio"),
  email: Yup.string()
    .email("Digite um e-mail valido")
    .required("Campo Obrigatorio"),
  date: Yup.string().required("Campo obrigatório"),
  notification: Yup.boolean().oneOf([true], "Aceite receber as notificações"),
  option: Yup.string().required("Campo obrigatório"),
  teste: Yup.string().required("Campo obrigatório"),
});

function App() {
  return (
    <FormComponent
      inputs={inputs}
      onSubmit={(values: any) => console.log(values)}
      validationScheam={validationSchema}
    />
  );
}

export default App;
