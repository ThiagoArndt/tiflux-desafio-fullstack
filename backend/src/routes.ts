import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateClientController } from "./controllers/CreateClientController";
import { ListClientController } from "./controllers/ListClientController";
import { DeleteClientController } from "./controllers/DeleteClientController";
import ClientValidator from "./middlewares/ClientValidator";
import { UpdateClientController } from "./controllers/UpdateClientController";




export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    //Lista todos os clients
    fastify.get("/listClients", async(request:FastifyRequest<{ Body: any }>, response: FastifyReply) => {
        return new ListClientController().handle(request, response)  
})

    //Cria um cliente
    fastify.post("/createClient", {preHandler: [ClientValidator]}, async(request:FastifyRequest<{ Body: any }>, response: FastifyReply) => {
            return new CreateClientController().handle(request, response)  
    })

    //Atualiza os dados de um cliente
    fastify.post("/updateClient", {preHandler: [ClientValidator]}, async(request:FastifyRequest<{ Body: any }>, response: FastifyReply) => {
        return new UpdateClientController().handle(request, response)   
})

    //Deleta os dados de um cliente
    fastify.post("/deleteClient", async(request:FastifyRequest<{Querystring: {id: string}} >, response: FastifyReply) => {
        return new DeleteClientController().handle(request, response)   
})
    
}