import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth-guard.service';
import { AddContactProviderInput, ContactProvider } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver()
export class AddContactProviderResolver {
  @Mutation('addActivity')
  @UseGuards(AuthGuard)
  async addContactProvider(
    @Args('input') input: AddContactProviderInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<ContactProvider> {
    return dataSources.volunteer.addContactProvider(input);
  }
}
