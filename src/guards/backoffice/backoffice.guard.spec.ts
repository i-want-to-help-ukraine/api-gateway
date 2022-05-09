import { BackofficeGuard } from './backoffice.guard';

describe('BackofficeGuard', () => {
  it('should be defined', () => {
    expect(new BackofficeGuard()).toBeDefined();
  });
});
