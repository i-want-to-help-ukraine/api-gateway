import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeAuthService } from './backoffice-auth.service';

describe('BackofficeAuthService', () => {
  let service: BackofficeAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackofficeAuthService],
    }).compile();

    service = module.get<BackofficeAuthService>(BackofficeAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
