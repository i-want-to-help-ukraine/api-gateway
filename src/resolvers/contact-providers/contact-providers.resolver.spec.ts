import { Test, TestingModule } from '@nestjs/testing';
import { ContactProvidersResolver } from './contact-providers.resolver';

describe('ContactProvidersResolver', () => {
  let resolver: ContactProvidersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactProvidersResolver],
    }).compile();

    resolver = module.get<ContactProvidersResolver>(ContactProvidersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
