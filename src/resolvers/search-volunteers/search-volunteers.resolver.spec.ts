import { Test, TestingModule } from '@nestjs/testing';
import { SearchVolunteersResolver } from './search-volunteers.resolver';

describe('SearchVolunteersResolver', () => {
  let resolver: SearchVolunteersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchVolunteersResolver],
    }).compile();

    resolver = module.get<SearchVolunteersResolver>(SearchVolunteersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
