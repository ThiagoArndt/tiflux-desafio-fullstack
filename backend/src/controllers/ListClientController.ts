import {FastifyRequest, FastifyReply} from "fastify";
import { ListClientService } from "../services/ListClientService";

class ListClientController{
    async handle(request:FastifyRequest, response: FastifyReply){
        try{
        //Call service to get all clients as an Array
        const listClientService = new ListClientService()
        const clients = await listClientService.execute();
        
        response.send(clients)

        }catch(e:any){
            return response.status(400).send({ error: e.message });
        }
    }
}

export { ListClientController}