import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const detailGuard: CanActivateFn = () => {
  const router = inject(Router);
  const navState = router.getCurrentNavigation()?.extras.state;
  if (navState && navState['allowed']) {
    return true;
  }
  router.navigate(['/events']);
  return false;
};
