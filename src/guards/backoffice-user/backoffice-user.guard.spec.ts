import { BackofficeUserGuard } from './backoffice-user.guard';

describe('BackofficeUserGuard', () => {
  it('should be defined', () => {
    expect(new BackofficeUserGuard()).toBeDefined();
  });
});
