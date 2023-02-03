import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from "typedi";


// Todo: Refine the work on this
@Service()
@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.error(`💥 error: ${error}`);
    response.status(error.status || 500).send({
      message: error.message || 'An internal server error occurred',
    });
  }
}