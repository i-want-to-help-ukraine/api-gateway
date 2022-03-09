import { Test, TestingModule } from '@nestjs/testing';
import { VolunteersSearchResolver } from './volunteers-search.resolver';

describe('VolunteersSearchResolver', () => {
  let resolver: VolunteersSearchResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteersSearchResolver],
    }).compile();

    resolver = module.get<VolunteersSearchResolver>(VolunteersSearchResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
