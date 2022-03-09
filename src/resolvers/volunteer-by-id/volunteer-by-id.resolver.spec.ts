import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerByIdResolver } from './get-volunteer-by-id.resolver';

describe('GetVolunteerByIdResolver', () => {
  let resolver: VolunteerByIdResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerByIdResolver],
    }).compile();

    resolver = module.get<VolunteerByIdResolver>(VolunteerByIdResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
