import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProfileV2Resolver } from './update-profile-v2.resolver';

describe('UpdateProfileV2Resolver', () => {
  let resolver: UpdateProfileV2Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProfileV2Resolver],
    }).compile();

    resolver = module.get<UpdateProfileV2Resolver>(UpdateProfileV2Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
