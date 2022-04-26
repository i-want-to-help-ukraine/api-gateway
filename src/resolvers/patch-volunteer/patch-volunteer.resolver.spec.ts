import { Test, TestingModule } from '@nestjs/testing';
import { PatchVolunteerResolver } from './patch-volunteer.resolver';

describe('PatchVolunteerResolver', () => {
  let resolver: PatchVolunteerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchVolunteerResolver],
    }).compile();

    resolver = module.get<PatchVolunteerResolver>(PatchVolunteerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
