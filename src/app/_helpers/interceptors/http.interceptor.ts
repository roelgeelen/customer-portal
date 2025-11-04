import { HttpInterceptorFn } from "@angular/common/http";


export const SignatureParamInterceptor:HttpInterceptorFn = (req, next) => {
  const sigToken = localStorage.getItem('sig');
  const isExtern = localStorage.getItem('extern')??'0';

  if (sigToken) {
    req = req.clone({
      params: req.params.set('sig', sigToken!).set('extern', isExtern)
    });
  }

  // send cloned request with header to the next handler.
  return next(req);
}
