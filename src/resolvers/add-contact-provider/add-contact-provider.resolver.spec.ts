import { Test, TestingModule } from '@nestjs/testing';
import { AddContactProviderResolver } from './add-contact-provider.resolver';

describe('AddContactProviderResolver', () => {
  let resolver: AddContactProviderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddContactProviderResolver],
    }).compile();

    resolver = module.get<AddContactProviderResolver>(AddContactProviderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
