import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisaClient from "../prisma";
import { clients as ClientModel } from "@prisma/client";


class UpdateClientService {
    async execute(model: ClientModel){
        try{
            const {id, ...rest} = model
            const updateClient = await prisaClient.clients.update({where: {id: model.id}, data: rest  })
            return updateClient;
        }
        catch(e:any){
            if(e instanceof PrismaClientKnownRequestError){
                if(e.code === "P2025")
                throw new Error("Id não encontrado"); 
            }
                throw e;  
        }
    }
}

export { UpdateClientService }