import {inject} from "@angular/core";
import {LOCALE_ID} from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";


export const SignatureParamInterceptor:HttpInterceptorFn = (req, next) => {
  const sigToken = localStorage.getItem('sig');
  const isExtern = localStorage.getItem('extern')??'0';
  const locale = inject(LOCALE_ID);

  // Strip region suffix: 'nl' stays 'nl', 'en-US' becomes 'en'
  const lang = locale.split('-')[0];

  let cloned = req.clone({
    headers: req.headers.set('Accept-Language', lang)
  });

  if (sigToken) {
    cloned = cloned.clone({
      params: cloned.params.set('sig', sigToken!).set('extern', isExtern)
    });
  }

  return next(cloned);
}
