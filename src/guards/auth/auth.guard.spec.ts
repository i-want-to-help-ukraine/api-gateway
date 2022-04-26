import { AuthGuard } from './auth-guard.service';

describe('Auth0Guard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(null as any)).toBeDefined();
  });
});
