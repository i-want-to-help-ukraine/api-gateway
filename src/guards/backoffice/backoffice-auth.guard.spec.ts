import { BackofficeAuthGuard } from './backoffice-auth.guard';

describe('BackofficeAuthGuard', () => {
  it('should be defined', () => {
    expect(new BackofficeAuthGuard()).toBeDefined();
  });
});
