import { Test, TestingModule } from '@nestjs/testing';
import { RejectVolunteerResolver } from './reject-volunteer.resolver';

describe('RejectVolunteerResolver', () => {
  let resolver: RejectVolunteerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectVolunteerResolver],
    }).compile();

    resolver = module.get<RejectVolunteerResolver>(RejectVolunteerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
