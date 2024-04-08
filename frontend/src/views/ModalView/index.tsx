import React, { useState } from "react";
import ModalViewRoot from "./ModalViewRoot";
import ModalViewContacts from "./ModalViewContacts";
import ModalViewContent from "./ModalViewContent";
import { ClientInterface } from "../../types/clientTypes";

interface ModalViewIndexProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clientProps?: ClientInterface;
}

function ModalViewIndex(props: Readonly<ModalViewIndexProps>) {
  const { clientProps, setIsModalOpen } = props;
  const [clientData, setClientData] = useState<ClientInterface>({
    id: clientProps?.id ?? "",
    name: clientProps?.name ?? "",
    document: clientProps?.document ?? "",
    address: {
      cep: clientProps?.address?.cep ?? "",
      street: clientProps?.address?.street ?? "",
      number: clientProps?.address?.number?.toString() ?? "",
    },
    contacts:
      clientProps?.contacts?.length == 0 || clientProps?.contacts == null
        ? [{ phone: "", email: "" }]
        : clientProps.contacts,
  });

  return (
    <ModalViewRoot clientData={clientData} setIsModalOpen={setIsModalOpen}>
      <ModalViewContent clientData={clientData} setClientData={setClientData} />
      <ModalViewContacts
        clientData={clientData}
        setClientData={(contacts) => setClientData({ ...clientData, ...contacts })}
      />
    </ModalViewRoot>
  );
}

export default ModalViewIndex;
