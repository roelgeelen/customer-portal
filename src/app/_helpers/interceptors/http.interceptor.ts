import { HttpInterceptorFn } from "@angular/common/http";


export const SignatureParamInterceptor:HttpInterceptorFn = (req, next) => {
  const sigToken = localStorage.getItem('sig');

  if (sigToken) {
    req = req.clone({
      params: req.params.set('sig', sigToken!)
    });
  }

  // send cloned request with header to the next handler.
  return next(req);
}
