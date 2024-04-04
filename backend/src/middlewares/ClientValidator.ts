import createHttpError from "http-errors";
import { clientValidation } from "../validators/clientValidation";

//Validation middleware with Joi
export default function(_req:any, _res:any, next:any) {
            const validated = clientValidation.validate(_req.body)

            if(validated.error?.isJoi){
                return next(createHttpError(422, {message: validated.error.message}))
               
            }
            else if(!validated.error?.isJoi){
                next()
            }
            else{
                _req.body = validated
                next()
            }
 
}