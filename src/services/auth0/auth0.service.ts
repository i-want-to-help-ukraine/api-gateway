import { Injectable } from '@nestjs/common';
import { ManagementClient } from 'auth0';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Auth0Service {
  constructor(private configService: ConfigService) {}

  async getUserProfile(token: string, authId: string): Promise<any> {
    try {
      return new ManagementClient({
        token,
        domain: this.configService.get('AUTH0_DOMAIN') || '',
      }).getUser({
        id: authId,
      });
    } catch (e) {
      return null;
    }
  }
}
