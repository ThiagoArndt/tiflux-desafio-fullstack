import { useEffect, useState } from "react";
import { Collapse, CollapseProps } from "antd";
import { Input } from "../components/Input";
import maskCpfCnpj from "../utils/maskCpfCnpj";
import { ClientContactInterface, ClientInterface } from "../types/clientTypes";
import maskCep from "../utils/maskCep";
import maskOnlyNumbers from "../utils/maskOnlyNumbers";
import { useDispatch } from "react-redux";
import { ImSpinner8 } from "react-icons/im";
import { handleAddClient, handleUpdateClient } from "../api/clients";

interface ModelViewProps extends ClientInterface {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalView(props: Readonly<ModelViewProps>) {
  const { setIsModalOpen } = props;

  //Hooks
  const dispatch = useDispatch();

  //Fields UseStates
  const [name, setName] = useState<string>(props.name ?? "");
  const [cpfcnpj, setCpfcnpj] = useState<string>(props.document ?? "");
  const [cep, setCep] = useState<string>(props.address?.cep ?? "");
  const [street, setStreet] = useState<string>(props.address?.street ?? "");
  const [number, setNumber] = useState<string>(
    props.address?.number != null ? props.address.number.toString() : ""
  );
  const [contacts, setContacts] = useState<ClientContactInterface[]>(
    props.contacts?.length === 0 || props.contacts == null
      ? [{ phone: "", email: "" }]
      : [...props.contacts, { phone: "", email: "" }]
  );

  const [clientContacts, setClientContacts] = useState<ClientContactInterface[]>(
    props.contacts ?? []
  );

  // Update clientContacts whenever contacts state changes
  useEffect(() => {
    setClientContacts(contacts);
  }, [contacts]);

  //State UseStates
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Functions
  const handleContactInputChange = (
    index: number,
    fieldName: keyof ClientContactInterface,
    value: string
  ) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.map((contact, i) => {
        if (i === index) {
          return {
            ...contact,
            [fieldName]: value,
          };
        }
        return contact;
      });

      if (
        value.trim() === "" &&
        updatedContacts.length > 1 &&
        updatedContacts[index].email === "" &&
        updatedContacts[index].phone === ""
      ) {
        removeContactInput(index);
      } else if (
        index === updatedContacts.length - 1 &&
        updatedContacts[index].phone?.trim() !== "" &&
        updatedContacts[index].email?.trim() !== ""
      ) {
        addContactInput();
      }

      return updatedContacts;
    });
  };

  const removeContactInput = (index: number) => {
    if (contacts.length === 1) return; // Ensure at least one input
    const updatedInputs = [...contacts];
    updatedInputs.splice(index, 1);
    setContacts(updatedInputs);
  };

  const addContactInput = () => {
    const updatedInputs = [...contacts];
    updatedInputs.push({ phone: "", email: "" });
    setContacts(updatedInputs);
  };

  //Close modal when "Cancel" button is pressed
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  //Api Functions
  const handleModalAddUpdateClient = async (e: any) => {
    e.preventDefault();

    const clientData: ClientInterface = {
      id: props.id,
      name: name,
      document: cpfcnpj,
      address: {
        street: street,
        cep: cep,
        number: number,
      },
      contacts: clientContacts,
    };

    const { id, ...rest } = clientData;
    if (id == null || id == undefined) {
      setIsLoading(true);
      //Add client
      try {
        await handleAddClient(rest, dispatch);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1500);
      } finally {
        setIsLoading(false);
      }
    } else {
      //Update Client
      try {
        await handleUpdateClient(clientData, dispatch);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1500);
      } finally {
        setIsLoading(false);
      }
    }
  };

  //Constants
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Vizualize os contatos do cliente",
      children: contacts.map((input, index) => (
        <div className="flex flex-row ml-[15px] gap-4 mb-2" key={index}>
          <Input.Root>
            <Input.Label label={"Telefone"} />
            <Input.TextField
              placeholder="(00)00000 - 0000"
              defaultValue={input.phone ?? ""}
              onChange={(event) => handleContactInputChange(index, "phone", event.target.value)}
            />
          </Input.Root>
          <Input.Root>
            <Input.Label label="E-mail" />
            <Input.TextField
              defaultValue={input.email}
              onChange={(event) => handleContactInputChange(index, "email", event.target.value)}
            />
          </Input.Root>
        </div>
      )),
    },
  ];

  return (
    <form onSubmit={handleModalAddUpdateClient}>
      <div className="flex flex-col gap-4">
        <Input.Root>
          <Input.Label htmlFor="name" label="Nome" isRequired />
          <Input.TextField
            required
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            defaultValue={name}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="CPF/CNPJ" />
          <Input.TextField
            maxLength={18}
            value={cpfcnpj ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCpfcnpj(maskCpfCnpj(event.target.value));
            }}
          />
        </Input.Root>
        <div className="flex flex-row gap-[14px]">
          <Input.Root>
            <Input.Label label="CEP" />
            <Input.TextField
              value={cep ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCep(maskCep(event.target.value));
              }}
            />
          </Input.Root>
          <Input.Root>
            <Input.Label label="Rua" />
            <Input.TextField
              name="street"
              defaultValue={street ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setStreet(event.target.value);
              }}
            />
          </Input.Root>
          <Input.Root>
            <Input.Label label="Número" />
            <Input.TextField
              name="number"
              defaultValue={number ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNumber(maskOnlyNumbers(event.target.value));
              }}
            />
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
        <div className="flex flex-row justify-end gap-2  text-sm font-medium mt-6">
          <button
            type="button"
            onClick={handleModalCancel}
            className="cursor-pointer bg-transparent border-grey-color-50 rounded-sm font-vietnam outline-none border-solid py-[6px] px-3 text-black-color"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className={`${
              isLoading ? "pointer-events-none" : "pointer-events-auto"
            }  bg-aqua-color cursor-pointer rounded-sm font-vietnam outline-none  border-none py-[6px] px-3 text-white-all-color`}
          >
            {isLoading ? (
              <ImSpinner8 className="@apply animate-[spin_1s_infinite_linear] m-auto" />
            ) : (
              "Salvar"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ModalView;
