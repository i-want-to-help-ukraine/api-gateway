import { Test, TestingModule } from '@nestjs/testing';
import { HideProfileResolver } from './hide-profile.resolver';

describe('HideProfileResolver', () => {
  let resolver: HideProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HideProfileResolver],
    }).compile();

    resolver = module.get<HideProfileResolver>(HideProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
