import { Test, TestingModule } from '@nestjs/testing';
import { AddSocialProviderResolver } from './add-social-provider.resolver';

describe('AddSocialProviderResolver', () => {
  let resolver: AddSocialProviderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddSocialProviderResolver],
    }).compile();

    resolver = module.get<AddSocialProviderResolver>(AddSocialProviderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
