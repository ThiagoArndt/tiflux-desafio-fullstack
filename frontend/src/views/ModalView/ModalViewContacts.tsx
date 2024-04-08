import React from "react";
import { Collapse, CollapseProps } from "antd";
import { ClientInterface, ClientContactInterface } from "../../types/clientTypes";
import { Input } from "../../components/Input";

interface ModalViewContactsProps {
  clientData: ClientInterface;
  setClientData: React.Dispatch<React.SetStateAction<ClientInterface>>;
}

function ModalViewContacts(props: Readonly<ModalViewContactsProps>) {
  const { clientData, setClientData } = props;

  const handleContactInputChange = (
    index: number,
    fieldName: keyof ClientContactInterface,
    value: string
  ) => {
    const updatedInputs = [...(clientData.contacts || [])]; // Provide a default empty array if contacts is undefined
    updatedInputs[index][fieldName] = value;
    setClientData({
      ...clientData,
      contacts: updatedInputs,
    });

    if (
      value.trim() === "" &&
      (clientData.contacts?.length ?? 0) > 1 && // Provide a default length of 0 if contacts is undefined
      updatedInputs[index].email === "" &&
      updatedInputs[index].phone === ""
    ) {
      removeContactInput(index);
    } else if (
      index === (clientData.contacts?.length ?? 0) - 1 && // Provide a default length of 0 if contacts is undefined
      (clientData.contacts?.[index].phone?.trim() ?? "") !== "" && // Provide a default empty string if phone is undefined
      (clientData.contacts?.[index].email?.trim() ?? "") !== "" // Provide a default empty string if email is undefined
    ) {
      addContactInput();
    }
  };

  const removeContactInput = (index: number) => {
    if ((clientData.contacts?.length ?? 0) === 1) return; // Provide a default length of 0 if contacts is undefined
    const updatedInputs = [...(clientData.contacts || [])]; // Provide a default empty array if contacts is undefined
    updatedInputs.splice(index, 1);
    setClientData({
      ...clientData,
      contacts: updatedInputs,
    });
  };

  const addContactInput = () => {
    const updatedInputs = [...(clientData.contacts || [])]; // Provide a default empty array if contacts is undefined
    updatedInputs.push({ phone: "", email: "" });
    setClientData({
      ...clientData,
      contacts: updatedInputs,
    });
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Vizualize os contatos do cliente",
      children: clientData.contacts?.map((contact, index) => (
        <div className="flex flex-row ml-[15px] gap-4 mb-2" key={index}>
          <Input.Root>
            <Input.Label label={"Telefone"} />
            <Input.TextField
              placeholder="(00)00000 - 0000"
              value={contact.phone}
              onChange={(e) => handleContactInputChange(index, "phone", e.target.value)}
            />
          </Input.Root>
          <Input.Root>
            <Input.Label label="E-mail" />
            <Input.TextField
              value={contact.email}
              onChange={(e) => handleContactInputChange(index, "email", e.target.value)}
            />
          </Input.Root>
        </div>
      )),
    },
  ];

  return (
    <Collapse
      accordion
      className="bg-transparent w-full ml-[-15px] font-vietnam font-normal"
      items={items}
      defaultActiveKey={["1"]}
      bordered={false}
      size="middle"
    />
  );
}

export default ModalViewContacts;
