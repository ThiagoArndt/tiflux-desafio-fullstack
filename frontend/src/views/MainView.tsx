import { SideBar } from "../components/SideBar/index";
import logo from "../assets/logo.png";
import { FaUserGroup, FaTrash } from "react-icons/fa6";
import { IoPowerOutline } from "react-icons/io5";
import { Button, Space } from "antd";
import { BiPlus } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Table } from "../components/Table";
import Modal from "antd/es/modal";
import ModalView from "./ModalView";
import { ClientInterface } from "../types/clientTypes";
import toast from "react-hot-toast";
import maskCpfCnpj from "../utils/maskCpfCnpj";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { handleDeleteClient, handleGetClients } from "../api/clients";

function MainView() {
  const clients = useSelector((state: RootState) => state.clients);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<ClientInterface | null>(null);

  //Get List of Clients
  useEffect(() => {
    handleGetClients(dispatch).catch((_) => {
      setHasError(true);
    });
  }, [dispatch]);

  //Delete Selected Client when modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      setSelectedClient(null);
    }
  }, [isModalOpen]);

  //Open modal for new client
  const openModalNewClient = () => {
    setIsModalOpen(true);
  };

  //Open modal to update selected client from table
  const openModalUpdateClient = (client: ClientInterface) => {
    if (client == null) return toast.error("Cliente é nulo");
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  //Handle Cancel/Close Modal Function
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  //Table Constants
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CPF/CNPJ",
      dataIndex: "document",
      key: "document",
      render: (text: string) => <>{maskCpfCnpj(text)}</>,
    },
    {
      title: "Endereço",
      dataIndex: "street",
      key: "address.street",
      render: (_: unknown, record: ClientInterface) => (
        <>
          {record.address?.street}
          {record.address?.number != "" ? "," : ""} {record.address?.number}
        </>
      ),
    },
    {
      title: "Contatos",
      dataIndex: "contatos",
      key: "contacts",
      render: (_: unknown, record: ClientInterface) => <>{record.contacts?.length} Contatos</>,
    },
    {
      title: "",
      key: "action",
      render: (_: unknown, record: ClientInterface) => (
        <Space size="middle">
          <FaEdit
            onClick={() => openModalUpdateClient(record)}
            className="text-dark-icon-color cursor-pointer"
          />
          <FaTrash
            onClick={() => handleDeleteClient(record.id!, dispatch)}
            className="text-dark-icon-color cursor-pointer"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-row h-screen">
      <SideBar.Root>
        <SideBar.Image src={logo} />
        <SideBar.Content>
          <Button
            icon={<FaUserGroup />}
            className="text-white
     bg-transparent
       hover:!text-white font-poppins outline-none  border-none text-lg font-medium inline-flex items-center text-left hover:!bg-white hover:!bg-opacity-5"
          >
            Clientes
          </Button>
          <Button
            icon={<IoPowerOutline />}
            className="text-red-color
     bg-transparent
       hover:!text-white font-poppins outline-none  border-none text-lg font-medium inline-flex items-center text-left hover:!bg-white hover:!bg-opacity-5"
          >
            Desconectar
          </Button>
        </SideBar.Content>
      </SideBar.Root>
      <div className="grow ml-[156px] mt-[172px] mr-[280px] h-[450px] font-poppins rounded-sm bg-white-all-color">
        {!hasError ? (
          <Table.Root>
            <Table.Header>
              <p className="my-auto font-normal">Clientes</p>
              <Button
                onClick={openModalNewClient}
                icon={<BiPlus />}
                className="text-white-color font-normal font-vietnam my-auto px-6 bg-aqua-color rounded-sm text-base hover:!text-white outline-none  border-none  inline-flex items-center text-left hover:!bg-aqua-color hover:!bg-opacity-95"
              >
                Cliente
              </Button>
            </Table.Header>
            <Table.Content dataSource={clients} columns={columns} />
          </Table.Root>
        ) : (
          <div className="flex h-full">
            <p className="m-auto font-vietnam text-2xl items-center justify-center">
              Infelizmente, não conseguimos resgatar sua lista de clientes.
            </p>
          </div>
        )}
      </div>
      <Modal
        width={570}
        title={
          <p className="font-vietnam font-normal text-base text-grey-color-100">Editar Cliente</p>
        }
        open={isModalOpen}
        destroyOnClose
        onCancel={handleModalCancel}
        footer={<></>}
      >
        <ModalView {...selectedClient!} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
}

export default MainView;
