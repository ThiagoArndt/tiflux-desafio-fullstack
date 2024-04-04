import prisaClient from "../prisma";
import { clients as ClientModel } from "@prisma/client";


class CreateClientService {
    async execute(model: ClientModel){
        try{
            const createClient = await prisaClient.clients.create({ data:model })
            return createClient;
        }
        catch(e:any){

          
            throw e;
        }
       
       
    }
}

export { CreateClientService }