import { Test, TestingModule } from '@nestjs/testing';
import { RequestedVolunteersResolver } from './requested-volunteers.resolver';

describe('RequestedVolunteersResolver', () => {
  let resolver: RequestedVolunteersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestedVolunteersResolver],
    }).compile();

    resolver = module.get<RequestedVolunteersResolver>(RequestedVolunteersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
