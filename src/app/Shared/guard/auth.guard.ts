import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../service/auth.service';
import {CanActivateChild} from '@angular/router';

interface CanComponentDeactivate{
  confirm(): boolean;
}

@Injectable({
  providedIn: 'root'
})



export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<CanComponentDeactivate> {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   if (this.auth.isAuthenticated()) {
     return true;
   }

    this.router.navigate(['/admin', 'login'])


  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('checking child route access');
    return true;
  }

  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return component.confirm();
  }



}
