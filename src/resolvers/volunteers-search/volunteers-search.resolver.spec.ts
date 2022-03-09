import { Test, TestingModule } from '@nestjs/testing';
import { VolunteersSearchResolver } from './search-volunteers.resolver';

describe('SearchVolunteersResolver', () => {
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
