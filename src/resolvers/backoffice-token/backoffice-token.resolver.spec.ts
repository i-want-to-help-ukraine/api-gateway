import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeTokenResolver } from './backoffice-token.resolver';

describe('BackofficeTokenResolver', () => {
  let resolver: BackofficeTokenResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackofficeTokenResolver],
    }).compile();

    resolver = module.get<BackofficeTokenResolver>(BackofficeTokenResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
