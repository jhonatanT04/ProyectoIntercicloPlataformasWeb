import { CanActivateFn } from '@angular/router';

export const guardsAuthGuard: CanActivateFn = (route, state) => {
  return true;
};
