import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerPaymentOptionResolver } from './volunteer-payment-option.resolver';

describe('VolunteerPaymentOptionResolver', () => {
  let resolver: VolunteerPaymentOptionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerPaymentOptionResolver],
    }).compile();

    resolver = module.get<VolunteerPaymentOptionResolver>(VolunteerPaymentOptionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
