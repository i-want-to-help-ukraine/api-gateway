import { DataSource } from 'apollo-datasource';
import {
  VolunteerServiceRPCClient,
  VolunteerDto,
  SearchVolunteersRequest,
} from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import * as DataLoader from 'dataloader';
import { lastValueFrom, map } from 'rxjs';
import { SearchRequest, Volunteer } from '../../graphql.schema';

export class VolunteerDatasource extends DataSource {
  private volunteerLoader = new DataLoader<string, Volunteer | null>(
    async (ids: string[]) => {
      const volunteers = await lastValueFrom(
        this.volunteerServiceRPC
          .getVolunteersByIds({ ids })
          .pipe(
            map((response) =>
              response.volunteers.map((volunteer) =>
                this.mapVolunteer(volunteer),
              ),
            ),
          ),
      );

      return ids.map(
        (id) => volunteers.find((volunteer) => volunteer.id === id) || null,
      );
    },
  );

  constructor(private volunteerServiceRPC: VolunteerServiceRPCClient) {
    super();
  }

  searchVolunteers(request: SearchRequest): Promise<Volunteer[]> {
    const { city } = request;

    const rpcRequest: SearchVolunteersRequest = {
      city,
      activityType: [],
      donateOptions: [],
    };

    return lastValueFrom(
      this.volunteerServiceRPC
        .searchVolunteers(rpcRequest)
        .pipe(
          map((response) =>
            response.volunteers.map((volunteer) =>
              this.mapVolunteer(volunteer),
            ),
          ),
        ),
    );
  }

  getUserById(id: string): Promise<Volunteer | null> {
    return this.volunteerLoader.load(id);
  }

  private mapVolunteer(volunteerDto: VolunteerDto): Volunteer {
    const { id, name } = volunteerDto;

    return {
      id,
      name,
    };
  }
}
