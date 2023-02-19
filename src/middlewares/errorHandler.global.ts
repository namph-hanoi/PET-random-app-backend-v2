import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from "typedi";
import { ValidationError } from 'class-validator';

// Todo: Refine the work on this
@Service()
@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(errorObject: any, request: any, response: any, next: (err: any) => any) {
    // console.error(`💥 error: ${errorObject}`);
    const { errors } = errorObject;
    if (errors?.length && errors[0] instanceof ValidationError) {
      const errorDetails = errors.map((err: ValidationError) => {
        return {
          field: err.property,
          message: err.constraints,
        };
      });
      response.status(errorObject.status || 500).send({
        message: errorObject.message || 'An internal server error occurred',
        errors: errorDetails,
      });
    } else {
      response.status(errorObject.status || 500).send({
        message: errorObject.message || 'An internal server error occurred',
      });
    }
  }
}