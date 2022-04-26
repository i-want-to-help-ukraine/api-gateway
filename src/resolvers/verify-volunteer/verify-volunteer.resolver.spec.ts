import { Test, TestingModule } from '@nestjs/testing';
import { VerifyVolunteerResolver } from './verify-volunteer.resolver';

describe('VerifyVolunteerResolver', () => {
  let resolver: VerifyVolunteerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifyVolunteerResolver],
    }).compile();

    resolver = module.get<VerifyVolunteerResolver>(VerifyVolunteerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
