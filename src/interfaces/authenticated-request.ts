import { Request } from 'express';
import { AuthPayload } from './authPayload';

export interface AuthenticatedRequest extends Request {
  userAuth: AuthPayload;
}
