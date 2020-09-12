import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service'
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {

      if(!user) {   
        return next.handle(req);
      }
      
      const modifyReq = req.clone({ headers: new HttpHeaders().set('Authorization', 'Bearer '+ user.accessToken)});
      return next.handle(modifyReq);
    }));
  }
}
