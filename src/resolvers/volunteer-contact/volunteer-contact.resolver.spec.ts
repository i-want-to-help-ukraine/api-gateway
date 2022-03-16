import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerContactResolver } from './volunteer-contact.resolver';

describe('VolunteerContactResolver', () => {
  let resolver: VolunteerContactResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerContactResolver],
    }).compile();

    resolver = module.get<VolunteerContactResolver>(VolunteerContactResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
