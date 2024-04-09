import { AxiosError, AxiosResponse } from "axios";
import request from ".";
import { clientDeleted, clientPush, clientPushOne, clientUpdated } from "../store/slices/clientSlice";

import toast from "react-hot-toast";
import { AppDispatch } from "../store";
import { ClientInterface } from "../types/clientTypes";

//Delete
export const handleDeleteClient = (id: string, dispatch:AppDispatch) => {
    request("POST", "deleteClient", null, { id: id })
      .then((response: AxiosResponse) => {
        if (response.status != 200) throw new Error(response.statusText);
        dispatch(clientDeleted(response.data));
        toast.success("Cliente Deletado com sucesso!");
        setTimeout(() => {
        }, 1500);
      })
      .catch((error: AxiosError<any>) => {
        toast.error(error.response?.data?.message ?? "Não foi possível deletar o cliente");
        throw error;
      });
  };

//Create
export const handleAddClient = async(data:ClientInterface, dispatch:AppDispatch)=>{
  await request("POST", "createClient", data)
        .then((response: AxiosResponse) => {
     
          if (response.status != 200) throw new Error(response.statusText);
          dispatch(clientPushOne(response.data));
          toast.success("Cliente adicionado com sucesso!");
          
        })
        .catch((error: AxiosError<any>) => {
          toast.error(error.response?.data?.message ?? "Não foi possível adicionar o cliente");

          throw error;
        });
}

//Update
export const handleUpdateClient = async(data:ClientInterface, dispatch:AppDispatch)=>{
  await request("POST", "updateClient", data)
        .then((response: AxiosResponse) => {
          console.log(response);
          if (response.status != 200) throw new Error(response.statusText);
          dispatch(clientUpdated(response.data));
          toast.success("Cliente Atualizado com sucesso!");
        })
        .catch((error: AxiosError<any>) => {
          toast.error(error.response?.data?.message ?? "Não foi possível atualizar o cliente");

    
          throw error;
        });
}


//Get All
export const  handleGetClients=async (dispatch:AppDispatch)=>{
  try{
    await request("GET", "listClients")
    .then((response: AxiosResponse) => {
  
      if (response.status != 200) throw new Error(response.statusText);
      dispatch(clientPush(response.data));
    })
  } catch(e) {
    console.log(e);
    throw e;
  }
}