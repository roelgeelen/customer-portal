import {inject} from '@angular/core';
import {CanActivateFn, ActivatedRouteSnapshot, Router, UrlTree} from '@angular/router';
import {combineLatest, of} from 'rxjs';
import {catchError, filter, map, take} from 'rxjs/operators';
import {AuthenticationService} from "./authentication.service";

export const customersIndexGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const auth = inject(AuthenticationService);

  const id = route.paramMap.get('id');
  if (!id) return router.createUrlTree(['/']);

  let sig = route.queryParamMap.get('sig');
  if (sig) localStorage.setItem('sig', sig);
  sig = sig ?? localStorage.getItem('sig');
  if (!sig) return router.createUrlTree(['/']);

  auth.getData(id);

  const allowedStages = ['136638156', '57521142', 'closedwon'];

  return combineLatest([auth.customer$, auth.dealInfo$]).pipe(
    filter(([customer, dealInfo]) => !!customer && !!dealInfo),
    take(1),
    map(([_, dealInfo]): true | UrlTree => {
      console.log(dealInfo);
      const stage: string | undefined = (dealInfo as any)?.properties?.dealstage;
      const target = (stage && allowedStages.includes(stage))
        ? ['/customers', id, 'start']
        : ['/customers', id, 'configurations'];

      return router.createUrlTree(target);
    }),
    catchError(() => of(router.createUrlTree(['/'])))
  );
};
