import { handleAddClient, handleUpdateClient } from "../../api/clients";
import { ClientInterface } from "../../types/clientTypes";
import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { useDispatch } from "react-redux";

interface ModalViewRootProps {
  children: React.ReactNode;

  clientData: ClientInterface;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalViewRoot(props: Readonly<ModalViewRootProps>) {
  const dispatch = useDispatch();

  const { children, clientData, setIsModalOpen } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { id, ...rest } = clientData;
      if (id == null || id == "") {
        await handleAddClient(rest, dispatch);
      } else {
        await handleUpdateClient(clientData, dispatch);
      }
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  function handleModalCancel() {
    setIsModalOpen(false);
  }

  return (
    <form onSubmit={handleModalSubmit}>
      {children}{" "}
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
          disabled={isLoading}
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
    </form>
  );
}

export default ModalViewRoot;
