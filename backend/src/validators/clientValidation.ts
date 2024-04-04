
import Joi from '@hapi/joi';
import JoiDoc from './extensions';

const clientValidation = Joi .object({
    id: Joi.string(),
    name: Joi.string().min(6).max(100).required(),
    document: JoiDoc.string().document(), 
    address:  Joi.object().keys({
      cep: Joi.string().regex(/^\d{5}-\d{3}$/).required(),
      street: Joi.string().min(6).max(100).required(),
      number: Joi.number().min(1).max(10000).required()
  }),
  contacts: Joi.array().items(
    Joi.object().keys({
        email: Joi.string().email(),
        phone: Joi.string().regex(/^\(\d{2}\)\d{5}-\d{4}$/)
    }))
  });

export  {clientValidation};