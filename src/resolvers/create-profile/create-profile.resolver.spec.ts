import { Test, TestingModule } from '@nestjs/testing';
import { CreateProfileResolver } from './create-profile.resolver';

describe('CreateVolunteerResolver', () => {
  let resolver: CreateProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProfileResolver],
    }).compile();

    resolver = module.get<CreateProfileResolver>(CreateProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
