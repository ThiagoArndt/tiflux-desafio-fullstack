
import Joi from '@hapi/joi';
import JoiDoc from './extensions';

const clientValidation = Joi .object({
    id: Joi.string(),
    name: Joi.string().min(6).max(100).required()  .messages({
      'string.base': `O campo nome deve ser do tipo text`,
      'string.empty': `O campo nome não pode ser vazio`,
      'string.min': `O campo nome ter ter um mínimo de {#limit} caracteres`,
      'any.required': `O campo nome é obrigatório`
    }),
    document: JoiDoc.string().allow(null, '').document().messages({
      'document.invalid': `O campo CPF/CNPJ é inválido`,
  
    }),
    address:  Joi.object().keys({
      cep: Joi.string().allow(null, '').regex(/^\d{5}-\d{3}$/).required().messages({
        "object.regex": "O campo CEP não é válido",
        "string.pattern.base": "O campo CEP não é válido"
      }),
      street: Joi.string().allow(null, '').min(6).max(100).required(),
      number: Joi.string().allow(null, '').min(1).max(10000).required()
  }),
  contacts: Joi.array().items(
    Joi.object().keys({
        email: Joi.string().allow(null, '').email().messages({
          'string.email': 'O campo email precisa ser válido'
        }),
        phone: Joi.string().allow(null, '').regex(/^\(\d{2}\)\d{5}-\d{4}$/).messages({
          "object.regex": "O campo telefone deve ser (00)00000-0000",
          "string.pattern.base": "O campo telefone deve seguir o padrão (00)00000-0000"
        })
    }))
  });

export  {clientValidation};