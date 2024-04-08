import {cpf, cnpj} from 'cpf-cnpj-validator';
import Joi from '@hapi/joi';

const JoiDoc = Joi.extend((joi) => ({
    base: joi.string(),
    type: "string",
    messages: {
      'document.invalid': '"{{#label}}" is invalid'
    },
    rules: {
      document: {
        method(options) {
          return this.$_addRule({ name: 'document', args: { options } });
        },
        validate(value, {prefs, error}, args) {
            const valueParsed = parseInt(value.replace(/[^\d]/g, ''));
            if (valueParsed.toString().length === 11) { // Check if it's a CPF
              if (!cpf.isValid(valueParsed.toString())) {
                  return error('document.invalid');
              }
          } else if (valueParsed.toString().length === 14) { // Check if it's a CNPJ
              if (!cnpj.isValid(valueParsed.toString())) {
                  return error('document.invalid');
              }
          } else { // If the length is neither 11 nor 14, it's invalid
              return error('document.invalid');
          }
          return value; // If it passes all checks, return the value
        }
      }
    }
  }));



export default JoiDoc