import {inject, Injectable, LOCALE_ID} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocaleService {
  readonly currentLocale = inject(LOCALE_ID);

  /**
   * Navigates the browser to the equivalent page in the target locale.
   * Works with the separate-build setup where each locale is served
   * from its own base path (e.g. /nl/ and /en/).
   */
  switchToLocale(locale: string): void {
    if (locale === this.currentLocale) return;

    const {pathname, search, hash} = window.location;

    // Replace the locale segment at the start of the path (/nl/ → /en/)
    const localePattern = /^\/(nl|en)(\/|$)/;
    const newPath = localePattern.test(pathname)
      ? pathname.replace(localePattern, `/${locale}$2`)
      : `/${locale}${pathname}`;

    window.location.href = newPath + search + hash;
  }
}
