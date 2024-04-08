import React from "react";
import { Input } from "../../components/Input";
import { ClientInterface } from "../../types/clientTypes";
import maskOnlyNumbers from "../../utils/maskOnlyNumbers";
import maskCpfCnpj from "../../utils/maskCpfCnpj";
import maskCep from "../../utils/maskCep";

interface ModalViewContentProps {
  clientData: ClientInterface;
  setClientData: React.Dispatch<React.SetStateAction<ClientInterface>>;
}

function ModalViewContent(props: Readonly<ModalViewContentProps>) {
  const { clientData, setClientData } = props;

  return (
    <div className="flex flex-col gap-4">
      <Input.Root>
        <Input.Label htmlFor="name" label="Nome" isRequired />
        <Input.TextField
          required
          value={clientData.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setClientData((prevData) => ({
              ...prevData,
              name: event.target.value,
            }));
          }}
        />
      </Input.Root>
      <Input.Root>
        <Input.Label label="CPF/CNPJ" />
        <Input.TextField
          maxLength={18}
          value={clientData.document}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setClientData((prevData) => ({
              ...prevData,
              document: maskCpfCnpj(event.target.value),
            }));
          }}
        />
      </Input.Root>
      <div className="flex flex-row gap-[14px]">
        <Input.Root>
          <Input.Label label="CEP" />
          <Input.TextField
            value={clientData.address?.cep}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setClientData((prevData) => ({
                ...prevData,
                address: {
                  ...prevData.address,
                  cep: maskCep(event.target.value),
                },
              }));
            }}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Rua" />
          <Input.TextField
            name="street"
            value={clientData.address?.street}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setClientData((prevData) => ({
                ...prevData,
                address: {
                  ...prevData.address,
                  street: event.target.value,
                },
              }));
            }}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Número" />
          <Input.TextField
            name="number"
            value={clientData.address?.number}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setClientData((prevData) => ({
                ...prevData,
                address: {
                  ...prevData.address,
                  number: maskOnlyNumbers(event.target.value),
                },
              }));
            }}
          />
        </Input.Root>
      </div>
    </div>
  );
}

export default ModalViewContent;
