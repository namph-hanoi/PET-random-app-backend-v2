import { createParamDecorator } from 'routing-controllers';
import { plainToClassFromExist } from 'class-transformer';
import { validateOrReject } from 'class-validator';

interface IClassType {
  new (...args: any): any;
}

export function ValidateReqBody(validatorModel: IClassType) {
  return createParamDecorator({
    required:  false,
    value: (action) => {
      const args = action.request.body;
      const validateSchema = new validatorModel();
      const validateInstance = plainToClassFromExist(validateSchema, args);
      validateOrReject(validateInstance).catch(errors => {
        // errors is an array of validation errors
        if (errors.length > 0) {
          console.log('validation failed. errors: ', errors);
        } else {
          console.log('validation succeed');
        }
      });;
    },
  });
};
