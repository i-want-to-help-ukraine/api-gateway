import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { getVolunteerPackage } from '../grpc-services.config';
import { VolunteerDatasource } from './datasources/volunteer/volunteer.datasource';
import { VolunteerServiceRPCClient } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { ApolloDriver } from '@nestjs/apollo';
import { SearchVolunteersResolver } from './resolvers/search-volunteers/search-volunteers.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        typePaths: ['./src/schema.graphql'],
        sortSchema: true,
        dataSources: () => {
          const volunteerPackage = getVolunteerPackage(
            `${configService.get(
              'VOLUNTEER_SERVICE_GRPC_NAME',
            )}:${configService.get('VOLUNTEER_SERVICE_GRPC_PORT')}`,
          );

          const volunteerServiceRPC =
            volunteerPackage.getService<VolunteerServiceRPCClient>(
              'VolunteerServiceRPC',
            );

          return {
            volunteer: new VolunteerDatasource(volunteerServiceRPC),
          };
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [SearchVolunteersResolver],
})
export class AppModule {}
