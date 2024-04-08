import {FastifyRequest, FastifyReply} from "fastify";
import { UpdateClientService } from "../services/UpdateClientService";
import { clients as ClientModel } from "@prisma/client";

class UpdateClientController{
    async handle(request:FastifyRequest<{ Body: ClientModel }>, response: FastifyReply){
        try{
        //Call service to persist & update the data
        const updateClientService = new UpdateClientService()
        
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


         //Execute service
         const updatedclients = await updateClientService.execute(data);

        response.send(updatedclients)

        }catch(e:any){
            return response.status(400).send({ error: e.message });
        }
    }
}

export { UpdateClientController}