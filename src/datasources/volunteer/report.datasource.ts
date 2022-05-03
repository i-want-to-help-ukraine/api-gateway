import { DataSource } from 'apollo-datasource';
import {
  VolunteerServiceRPCClient,
  AddReportDto,
  ReportDto,
} from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import {
  AddReportInput,
  GetReportRequest,
  VolunteerReport,
} from '../../graphql.schema';
import { lastValueFrom, map } from 'rxjs';

export class ReportDatasource extends DataSource {
  constructor(private volunteerServiceRPC: VolunteerServiceRPCClient) {
    super();
  }

  getReports(input: GetReportRequest): Promise<VolunteerReport[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getReportsByIds({
          volunteerIds: [input.volunteerId],
          startTimestamp: input.startTimestamp || '',
          endTimestamp: input.endTimestamp || '',
        })
        .pipe(map((response) => response.reports)),
    );
  }

  addReport(input: AddReportInput, authId: string): Promise<VolunteerReport[]> {
    const { title, description } = input;

    const addReportRequest: AddReportDto = {
      title,
      description: description || '',
      volunteerId: authId,
    };

    return lastValueFrom(
      this.volunteerServiceRPC
        .addReport(addReportRequest)
        .pipe(
          map((response) =>
            response.reports.map((report) => this.mapReport(report)),
          ),
        ),
    );
  }

  private mapReport(report: ReportDto): VolunteerReport {
    const { id, title, description, proofsOfPayment } = report;

    return {
      id,
      title,
      description,
      proofsOfPayment,
      date: null,
    };
  }
}
