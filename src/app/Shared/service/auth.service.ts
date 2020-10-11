import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {pipe} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`
  constructor(private http: HttpClient) { }


  // tslint:disable-next-line:typedef
  login(User) {
    return this.http.post(this.authUrl, User)
      .pipe(
        tap(this.setToken)
      )
  }
  // + transfers string to int
  private setToken (response) {
    if (response) {
      const expDate = new Date( new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expDate.toString())
      localStorage.setItem('fb-token', response.idToken)
    } else {
      localStorage.clear()
    }


  }
  get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if ( new Date > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  logout() {
    this.setToken(null)
  }

// boolean if we have token return true else false
  isAuthenticated() {
    return !!this.token
  }


}
