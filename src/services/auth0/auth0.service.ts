import { Injectable } from '@nestjs/common';

@Injectable()
export class Auth0Service {
  async isAuthenticated(token: string): Promise<boolean> {
    return true;
  }

  async getUserProfile(token: string) {
    return {
      id: 'auth-id',
    };
  }
}
