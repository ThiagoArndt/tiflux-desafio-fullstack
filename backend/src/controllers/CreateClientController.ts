import {FastifyRequest, FastifyReply} from "fastify";
import { CreateClientService} from "../services/CreateClientService"
import { clients as ClientModel } from "@prisma/client";

class CreateClientController{
    async handle(request:FastifyRequest<{ Body: ClientModel }>, response: FastifyReply){
        try{ 
        //Call service to persist data and pass args
        const createClientService = new CreateClientService()
        const client = await createClientService.execute(request.body);
        
        response.send(client)

        }catch(e:any){
            return response.status(400).send({ error: e.message });
        }
    }
}

export { CreateClientController}