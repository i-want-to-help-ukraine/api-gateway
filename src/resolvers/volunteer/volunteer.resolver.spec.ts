import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerResolver } from './volunteer.resolver';

describe('VolunteerResolver', () => {
  let resolver: VolunteerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerResolver],
    }).compile();

    resolver = module.get<VolunteerResolver>(VolunteerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
