import { DataSource } from 'apollo-datasource';
import {
  VolunteerServiceRPCClient,
  AddReportDto,
  ReportDto,
} from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { AddReportInput, VolunteerReport } from '../../graphql.schema';
import { lastValueFrom, map } from 'rxjs';

export class ReportDatasource extends DataSource {
  constructor(private volunteerServiceRPC: VolunteerServiceRPCClient) {
    super();
  }

  addReport(input: AddReportInput, authId: string): Promise<VolunteerReport[]> {
    const { title, imageUrls, paidAmount, paidPositions } = input;

    const addReportRequest: AddReportDto = {
      title: title || '',
      imageUrls,
      paidAmount,
      paidPositions,
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

  getVolunteerReports(volunteerIds: string[]): Promise<VolunteerReport[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerReports({
          volunteerIds,
          startTimestamp: '',
          endTimestamp: '',
        })
        .pipe(map((response) => response.reports)),
    );
  }

  private mapReport(report: ReportDto): VolunteerReport {
    const {
      id,
      title,
      imageUrls,
      paidAmount,
      paidPositions,
      publishState,
      publishDate,
    } = report;

    return {
      id,
      title,
      imageUrls,
      paidAmount,
      paidPositions,
      publishDate,
      publishState,
    };
  }
}
