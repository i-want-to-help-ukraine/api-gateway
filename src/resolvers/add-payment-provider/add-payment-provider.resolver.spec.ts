import { Test, TestingModule } from '@nestjs/testing';
import { AddPaymentProviderResolver } from './add-payment-provider.resolver';

describe('AddPaymentProviderResolver', () => {
  let resolver: AddPaymentProviderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddPaymentProviderResolver],
    }).compile();

    resolver = module.get<AddPaymentProviderResolver>(AddPaymentProviderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
