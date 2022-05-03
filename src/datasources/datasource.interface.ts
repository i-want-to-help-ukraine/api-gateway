import { VolunteerDatasource } from './volunteer/volunteer.datasource';
import { ReportDatasource } from './volunteer/report.datasource';

export interface IDatasource {
  volunteer: VolunteerDatasource;
  report: ReportDatasource;
}
