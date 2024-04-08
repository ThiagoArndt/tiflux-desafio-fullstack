

import prisaClient from "../prisma";

class ListClientService {
    async execute(){
        try{
            const listOfClients = await prisaClient.clients.findMany();
            return listOfClients;
        }
        catch(e:any){
            throw e;
        }
       
       
    }
}

export { ListClientService }