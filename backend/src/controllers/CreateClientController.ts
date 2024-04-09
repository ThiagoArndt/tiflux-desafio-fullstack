import {FastifyRequest, FastifyReply} from "fastify";
import { CreateClientService} from "../services/CreateClientService"
import { clients as ClientModel } from "@prisma/client";

class CreateClientController{
    async handle(request:FastifyRequest<{ Body: ClientModel }>, response: FastifyReply){
        try{ 
        //Call service to persist data and pass args
        const createClientService = new CreateClientService()

        //Remove empty contacts
        const filteredContacts = request.body.contacts.filter(contact => {
            // Check if both email and phone are empty strings
            const isEmailEmpty = contact.email === '';
            const isPhoneEmpty = contact.phone === '';
            
            // Exclude the contact if both email and phone are empty strings,
            // unless email is not empty
            return !(isEmailEmpty && isPhoneEmpty) || !isEmailEmpty;
        });

        //New data
        const data = {...request.body, contacts: filteredContacts}

        //Execute Service
        const client = await createClientService.execute(data);
        
      

     
        response.send(client)

        }catch(e:any){
            return response.status(400).send({ error: e, message: e.message });
        }
    }
}

export { CreateClientController}