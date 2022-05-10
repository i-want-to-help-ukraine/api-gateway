import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  AuthServiceRPCClient,
  UserDto,
} from '@i-want-to-help-ukraine/protobuf/types/auth-service';
import { getBackofficeAuthPackage } from '../../../grpc-services.config';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class BackofficeAuthService implements OnModuleInit {
  private authServiceRPCClient: AuthServiceRPCClient;

  constructor(private configService: ConfigService) {}

  onModuleInit(): any {
    const backofficeAuthPackage = getBackofficeAuthPackage(
      `${this.configService.get(
        'AUTH_SERVICE_GRPC_NAME',
      )}:${this.configService.get('AUTH_SERVICE_GRPC_PORT')}`,
    );

    this.authServiceRPCClient =
      backofficeAuthPackage.getService<AuthServiceRPCClient>('AuthServiceRPC');
  }

  getToken(authId: string): Promise<string> {
    return lastValueFrom(
      this.authServiceRPCClient
        .getToken({ authId })
        .pipe(map((response) => response.accessToken)),
    );
  }

  getUser(authId: string): Promise<UserDto | undefined> {
    return lastValueFrom(
      this.authServiceRPCClient
        .getUser({ authId })
        .pipe(map((response) => response.user)),
    );
  }
}
