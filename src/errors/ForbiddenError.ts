import { STATUS_CODE } from '../utils/consts';
import BaseHttpError from './BaseHttpError';

export class ForbiddenError extends BaseHttpError {
  constructor(message = 'FORBIDDEN', functionName = '', error = {}, statusCode = STATUS_CODE.FORBIDDEN) {
    super(message, functionName, error, statusCode);
  }
}
