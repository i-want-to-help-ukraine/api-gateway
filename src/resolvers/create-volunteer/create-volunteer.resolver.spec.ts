import { Test, TestingModule } from '@nestjs/testing';
import { CreateVolunteerResolver } from './create-volunteer.resolver';

describe('CreateVolunteerResolver', () => {
  let resolver: CreateVolunteerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateVolunteerResolver],
    }).compile();

    resolver = module.get<CreateVolunteerResolver>(CreateVolunteerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
