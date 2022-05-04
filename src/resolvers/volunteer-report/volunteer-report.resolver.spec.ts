import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerReportResolver } from './volunteer-report.resolver';

describe('VolunteerReportResolver', () => {
  let resolver: VolunteerReportResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerReportResolver],
    }).compile();

    resolver = module.get<VolunteerReportResolver>(VolunteerReportResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
