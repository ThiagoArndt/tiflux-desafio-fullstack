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
          if (!cpf.isValid(valueParsed.toString()) && !cnpj.isValid(valueParsed.toString())) {
            return error('document.invalid');
          }
          return value;
        }
      }
    }
  }));



export default JoiDoc