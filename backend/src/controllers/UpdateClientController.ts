import {FastifyRequest, FastifyReply} from "fastify";
import { UpdateClientService } from "../services/UpdateClientService";
import { clients as ClientModel } from "@prisma/client";

class UpdateClientController{
    async handle(request:FastifyRequest<{ Body: ClientModel }>, response: FastifyReply){
        try{
        //Call service to persist & update the data
        const updateClientService = new UpdateClientService()
        const updatedclients = await updateClientService.execute(request.body);
        
        response.send(updatedclients)

        }catch(e:any){
            return response.status(400).send({ error: e.message });
        }
    }
}

export { UpdateClientController}