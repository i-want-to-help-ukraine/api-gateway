import { Test, TestingModule } from '@nestjs/testing';
import { SocialProvidersResolver } from './social-providers.resolver';

describe('SocialProvidersResolver', () => {
  let resolver: SocialProvidersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialProvidersResolver],
    }).compile();

    resolver = module.get<SocialProvidersResolver>(SocialProvidersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
