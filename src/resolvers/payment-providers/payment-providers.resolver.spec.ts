import { Test, TestingModule } from '@nestjs/testing';
import { PaymentProvidersResolver } from './payment-providers.resolver';

describe('PaymentProvidersResolver', () => {
  let resolver: PaymentProvidersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentProvidersResolver],
    }).compile();

    resolver = module.get<PaymentProvidersResolver>(PaymentProvidersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
