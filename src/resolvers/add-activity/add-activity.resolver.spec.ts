import { Test, TestingModule } from '@nestjs/testing';
import { AddActivityResolver } from './add-activity.resolver';

describe('AddActivityResolver', () => {
  let resolver: AddActivityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddActivityResolver],
    }).compile();

    resolver = module.get<AddActivityResolver>(AddActivityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
