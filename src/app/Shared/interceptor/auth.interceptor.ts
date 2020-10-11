import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';



@Injectable()
export class  AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private route: Router) {
  }

  // @ts-ignore
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.auth.logout()
          this.route.navigate(['/admin', 'login'])
        }
        return throwError(error)
      })
    )
  }


}
