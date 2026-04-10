import {ApplicationConfig} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import localeEn from '@angular/common/locales/en';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {SignatureParamInterceptor} from "./_helpers/interceptors/http.interceptor";
import {AuthInterceptor} from "./_helpers/interceptors/auth.interceptor";

// Register locale data so Angular's date/number/currency pipes work correctly
// for both locales. LOCALE_ID itself is set automatically by the i18n build.
registerLocaleData(localeNl);
registerLocaleData(localeEn);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(withInterceptors([SignatureParamInterceptor, AuthInterceptor]))
  ]
};
