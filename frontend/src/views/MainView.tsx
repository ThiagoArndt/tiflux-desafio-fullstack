import { SideBar } from "../components/SideBar/index";
import logo from "../assets/logo.png";

import { FaUserGroup, FaTrash } from "react-icons/fa6";
import { IoPowerOutline } from "react-icons/io5";
import { Button, Space } from "antd";
import { BiPlus } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { Table } from "../components/Table";

import Modal from "antd/es/modal";
import ModalView from "./ModalView";
interface DataSourceInterface {
  key: string;
  nome: string;
  cpfcnpj: string;
  endereco: string;
  contatos: string;
}

function MainView() {
  const dataSource: DataSourceInterface[] = [
    {
      key: "1",
      nome: "Luke Skywalker",
      cpfcnpj: "82.184.821/0001-90",
      endereco: "10 Downing Street",
      contatos: "(47)99999-9999",
    },
    {
      key: "2",
      nome: "Luke Skywalker",
      cpfcnpj: "82.184.821/0001-90",
      endereco: "10 Downing Street",
      contatos: "(47)99999-9999",
    },
    {
      key: "3",
      nome: "Luke Skywalker",
      cpfcnpj: "82.184.821/0001-90",
      endereco: "10 Downing Street",
      contatos: "(47)99999-9999",
    },
    {
      key: "4",
      nome: "Luke Skywalker",
      cpfcnpj: "82.184.821/0001-90",
      endereco: "10 Downing Street",
      contatos: "(47)99999-9999",
    },
    {
      key: "5",
      nome: "Luke Skywalker",
      cpfcnpj: "82.184.821/0001-90",
      endereco: "10 Downing Street",
      contatos: "(47)99999-9999",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModalNewClient = () => {
    setIsModalOpen(true);
  };

  const openModalUpdateClient = () => {
    setIsModalOpen(true);
  };

  // const handleDeleteClient = () => {

  // }

  const handleModalOk = () => {
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "CPF/CNPJ",
      dataIndex: "cpfcnpj",
      key: "cpfcnpj",
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
    },
    {
      title: "Contatos",
      dataIndex: "contatos",
      key: "contatos",
    },
    {
      title: "",
      key: "action",
      render: () => (
        <Space size="middle">
          <FaEdit onClick={openModalUpdateClient} className="text-dark-icon-color cursor-pointer" />
          <FaTrash className="text-dark-icon-color cursor-pointer" />
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
          <Table.Content dataSource={dataSource} columns={columns} />
        </Table.Root>
      </div>
      <Modal
        width={570}
        title={
          <p className="font-vietnam font-normal text-base text-grey-color-100">Editar Cliente</p>
        }
        open={isModalOpen}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        destroyOnClose
      >
        <ModalView />
      </Modal>
    </div>
  );
}

export default MainView;
