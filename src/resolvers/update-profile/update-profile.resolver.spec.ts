import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProfileResolver } from './update-profile.resolver';

describe('UpdateProfileResolver', () => {
  let resolver: UpdateProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProfileResolver],
    }).compile();

    resolver = module.get<UpdateProfileResolver>(UpdateProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
