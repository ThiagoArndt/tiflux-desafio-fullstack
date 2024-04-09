import {FastifyRequest, FastifyReply} from "fastify";
import { DeleteClientService } from "../services/DeleteClientService";

class DeleteClientController{
    async handle(request:FastifyRequest<{Querystring: {id: string}} >, response: FastifyReply){
        try{
            const { id } = request.query // Ok
         
        //Call service to delete Client
        const deleteClientService = new DeleteClientService()
        const deleteClients = await deleteClientService.execute(id);
        
        response.send(deleteClients)

        }catch(e:any){
            return response.status(400).send({ error: e.message });
        }
    }
}

export { DeleteClientController }