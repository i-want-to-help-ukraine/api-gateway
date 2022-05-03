import { Test, TestingModule } from '@nestjs/testing';
import { AddReportResolver } from './add-report.resolver';

describe('AddReportResolver', () => {
  let resolver: AddReportResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddReportResolver],
    }).compile();

    resolver = module.get<AddReportResolver>(AddReportResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
