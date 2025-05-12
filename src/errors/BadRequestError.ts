import { STATUS_CODE } from '../utils/consts';
import BaseHttpError from './BaseHttpError';

export class BadRequestError extends BaseHttpError {
  constructor(message = 'BAD_REQUEST', functionName = '', error = {}, statusCode = STATUS_CODE.BAD_REQUEST) {
    super(message, functionName, error, statusCode);
  }
}
