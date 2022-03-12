import { Request } from 'express';
import { Auth0Payload } from './auth0.payload';

export interface AuthenticatedRequest extends Request {
  userAuth: Auth0Payload;
}
