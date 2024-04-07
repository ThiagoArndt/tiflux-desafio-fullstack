import { useState } from "react";
import { Collapse, CollapseProps } from "antd";
import { Input } from "../components/Input";

interface ModelViewProps {
  name?: string;
  cpfcnpj?: string;
  cep?: string;
  address?: string;
  number?: string;
  contacts?: InputItem[];
}

interface InputItem {
  telphone: string;
  email: string;
}

function ModalView(props: Readonly<ModelViewProps>) {
  const { address, cep, contacts, cpfcnpj, name, number } = props;
  const [inputs, setInputs] = useState<InputItem[]>(contacts ?? [{ telphone: "", email: "" }]);

  const handleContactInputChange = (index: number, fieldName: keyof InputItem, value: string) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][fieldName] = value;
    setInputs(updatedInputs);
    if (
      value.trim() === "" &&
      inputs.length > 1 &&
      updatedInputs[index].email === "" &&
      updatedInputs[index].telphone == ""
    ) {
      removeContactInput(index);
    } else if (
      index === inputs.length - 1 &&
      inputs[index].telphone.trim() !== "" &&
      inputs[index].email.trim() !== ""
    ) {
      addContactInput();
    }
  };

  const removeContactInput = (index: number) => {
    if (inputs.length === 1) return; // Ensure at least one input
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const addContactInput = () => {
    const updatedInputs = [...inputs];
    updatedInputs.push({ telphone: "", email: "" });
    setInputs(updatedInputs);
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Vizualize os contatos do cliente",
      children: inputs.map((input, index) => (
        <div className="flex flex-row ml-[15px] gap-4" key={index}>
          <Input.Root>
            <Input.Label label={"Telefone"} />
            <Input.TextField
              placeholder="(00)00000-0000"
              value={input.telphone}
              onChange={(event) => handleContactInputChange(index, "telphone", event.target.value)}
            />
          </Input.Root>
          <Input.Root>
            <Input.Label label="E-mail" />
            <Input.TextField
              value={input.email}
              onChange={(event) => handleContactInputChange(index, "email", event.target.value)}
            />
          </Input.Root>
        </div>
      )),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Input.Root>
        <Input.Label label="Nome" isRequired />
        <Input.TextField value={name ?? ""} />
      </Input.Root>
      <Input.Root>
        <Input.Label label="CPF/CNPJ" />
        <Input.TextField value={cpfcnpj ?? ""} />
      </Input.Root>
      <div className="flex flex-row gap-[14px]">
        <Input.Root>
          <Input.Label label="CEP" />
          <Input.TextField value={cep ?? ""} />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Rua" />
          <Input.TextField value={address ?? ""} />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Número" />
          <Input.TextField value={number ?? ""} />
        </Input.Root>
      </div>

      <Collapse
        accordion
        className="bg-transparent w-full ml-[-15px] font-vietnam font-normal"
        items={items}
        defaultActiveKey={["1"]}
        bordered={false}
        size="middle"
      />
    </div>
  );
}

export default ModalView;
