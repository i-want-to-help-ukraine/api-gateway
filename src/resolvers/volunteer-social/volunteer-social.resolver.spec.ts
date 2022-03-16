import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerSocialResolver } from './volunteer-social.resolver';

describe('VolunteerSocialResolver', () => {
  let resolver: VolunteerSocialResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerSocialResolver],
    }).compile();

    resolver = module.get<VolunteerSocialResolver>(VolunteerSocialResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
