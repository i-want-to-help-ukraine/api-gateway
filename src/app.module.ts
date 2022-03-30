import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { getVolunteerPackage } from '../grpc-services.config';
import { VolunteerDatasource } from './datasources/volunteer/volunteer.datasource';
import { VolunteerServiceRPCClient } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { ApolloDriver } from '@nestjs/apollo';
import { CitiesResolver } from './resolvers/cities/cities.resolver';
import { ActivitiesResolver } from './resolvers/activities/activities.resolver';
import { VolunteerResolver } from './resolvers/volunteer/volunteer.resolver';
import { VolunteersSearchResolver } from './resolvers/volunteers-search/volunteers-search.resolver';
import { SocialProvidersResolver } from './resolvers/social-providers/social-providers.resolver';
import { PaymentProvidersResolver } from './resolvers/payment-providers/payment-providers.resolver';
import { ContactProvidersResolver } from './resolvers/contact-providers/contact-providers.resolver';
import { ProfileResolver } from './resolvers/profile/profile.resolver';
import { Auth0Service } from './services/auth0/auth0.service';
import { UpdateProfileResolver } from './resolvers/update-profile/update-profile.resolver';
import { HideProfileResolver } from './resolvers/hide-profile/hide-profile.resolver';
import { CreateProfileResolver } from './resolvers/create-profile/create-profile.resolver';
import { SocialProviderResolver } from './resolvers/social-provider/social-provider.resolver';
import { VolunteerSocialResolver } from './resolvers/volunteer-social/volunteer-social.resolver';
import { VolunteerContactResolver } from './resolvers/volunteer-contact/volunteer-contact.resolver';
import { VolunteerPaymentOptionResolver } from './resolvers/volunteer-payment-option/volunteer-payment-option.resolver';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './controllers/health-check/health-check.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TerminusModule,
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
  controllers: [HealthCheckController],
  providers: [
    CitiesResolver,
    ActivitiesResolver,
    CreateProfileResolver,
    VolunteerResolver,
    VolunteersSearchResolver,
    SocialProviderResolver,
    SocialProvidersResolver,
    PaymentProvidersResolver,
    ContactProvidersResolver,
    ProfileResolver,
    Auth0Service,
    UpdateProfileResolver,
    HideProfileResolver,
    VolunteerSocialResolver,
    VolunteerContactResolver,
    VolunteerPaymentOptionResolver,
  ],
})
export class AppModule {}
