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
  const sigInUrl = route.queryParamMap.get('sig');
  if (sigInUrl) {
    localStorage.setItem('sig', sigInUrl);

    // Strip 'sig' uit de huidige URL met RouterStateSnapshot
    const tree = router.parseUrl(state.url);
    // verwijder de query param 'sig'
    if (tree.queryParams && 'sig' in tree.queryParams) {
      const { sig, ...rest } = tree.queryParams as Record<string, any>;
      tree.queryParams = rest;
    }
    return tree; // 👉 UrlTree teruggeven i.p.v. navigate()
  }

  const sig = localStorage.getItem('sig');
  if (!sig) return router.createUrlTree(['/']);

  // 2) Data laden
  const id = route.paramMap.get('id');
  if (id) auth.getData(id);

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
