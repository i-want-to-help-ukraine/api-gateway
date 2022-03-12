import { Test, TestingModule } from '@nestjs/testing';
import { PaymentProviderResolver } from './payment-provider.resolver';

describe('PaymentProviderResolver', () => {
  let resolver: PaymentProviderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentProviderResolver],
    }).compile();

    resolver = module.get<PaymentProviderResolver>(PaymentProviderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
