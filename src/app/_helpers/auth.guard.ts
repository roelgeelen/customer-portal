import {inject} from '@angular/core';
import {CanActivateFn, ActivatedRouteSnapshot, Router, UrlTree} from '@angular/router';
import {combineLatest, of} from 'rxjs';
import {filter, map, take, catchError} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot): any => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);
  let sig = route.queryParamMap.get('sig');
  if (sig) {
    localStorage.setItem('sig', sig);
    router.navigate([], {
      queryParams: {sig: null},
      queryParamsHandling: 'merge'
    });
  } else {
    sig = localStorage.getItem('sig');
  }

  if (!sig) {
    return of(router.createUrlTree(['/']));
  }

  const id = route.paramMap.get('id');
  if (id) {
    auth.getData(id);
  }
  const requiredStages = (route.data?.['requireDealStages'] as string[] | undefined) ?? null;
  return combineLatest([auth.customer$, auth.dealInfo$]).pipe(
    filter(([customer, dealInfo]) => {
      if (!customer) return false;
      if (!requiredStages) return true;
      return !!dealInfo;
    }),
    take(1),
    map(([customer, dealInfo]): true | UrlTree => {
      if (!customer) {
        return router.createUrlTree(['/']);
      }

      if (!requiredStages) {
        return true; // alleen customer nodig
      }

      const stage = (dealInfo as any)?.properties?.dealstage as string | undefined;
      const ok = !!stage && requiredStages.includes(stage);
      return ok ? true : router.createUrlTree(['/']);
    }),
    catchError(() => of(router.createUrlTree(['/'])))
  );
};
