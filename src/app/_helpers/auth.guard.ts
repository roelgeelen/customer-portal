// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { of, combineLatest } from 'rxjs';
import { filter, map, take, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const auth   = inject(AuthenticationService);

  // 1) SIG verwerken
  const isExternUrl = route.queryParamMap.get('extern');
  if (isExternUrl) {
    localStorage.setItem('extern', isExternUrl);
  }
  const sigInUrl = route.queryParamMap.get('sig');
  if (sigInUrl) {
    localStorage.setItem('sig', sigInUrl);
    const tree = router.parseUrl(state.url);
    if (tree.queryParams && 'sig' in tree.queryParams) {
      tree.queryParams = [];
    }
    return tree; // 👉 UrlTree teruggeven i.p.v. navigate()
  }

  const sig = localStorage.getItem('sig');
  if (!sig) return router.createUrlTree(['/']);

  // 2) Data laden
  const id = route.paramMap.get('id');
  if (id) auth.getData(id);

  const isExtern = localStorage.getItem('extern');
  if (isExtern) {
    if(!route.data?.['allowExternal'] as boolean) {
      return router.createUrlTree(['/']);
    }
  }

  const requiredStages = (route.data?.['requireDealStages'] as string[] | undefined) ?? null;

  if (!requiredStages) {
    return auth.customer$.pipe(
      filter(Boolean),
      take(1),
      map(() => true as const),
      catchError(() => of(router.createUrlTree(['/'])))
    );
  }

  return combineLatest([auth.customer$, auth.dealInfo$]).pipe(
    filter(([c, d]) => !!c && !!d),
    take(1),
    map(([_, deal]) => {
      const stage: string | undefined = (deal as any)?.properties?.dealstage;
      return stage && requiredStages.includes(stage) ? true : router.createUrlTree(['/']);
    }),
    catchError(() => of(router.createUrlTree(['/'])))
  );
};
