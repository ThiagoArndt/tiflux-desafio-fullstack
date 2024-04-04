import prisaClient from "../prisma";

class DeleteClientService {
    async execute(id:string){
        try{
            const deletedClient = await prisaClient.clients.delete({ where: {id: id} })
            return deletedClient;
        }
        catch(e:any){
            throw e;
        }
    }
}

export { DeleteClientService }