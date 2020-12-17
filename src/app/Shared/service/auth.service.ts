import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;

  defaultAvatar = 'https://www.flaticon.com/svg/static/icons/svg/634/634795.svg';
  // tslint:disable-next-line:variable-name
  private _userData: Observable<firebase.User>;

  private currentUser: UserData;
  private currentUser$ = new BehaviorSubject<UserData>(null);

  constructor(private http: HttpClient,
              private afs: AngularFirestore,
              private router: Router,
              private afAuth: AngularFireAuth) {


    this._userData = afAuth.authState;

    this._userData.subscribe(user => {
      if (user) {
        this.afs.collection<UserData>('users')
          .doc<UserData>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            // tslint:disable-next-line:triple-equals
            if (currentUser != undefined) {
              this.currentUser = currentUser;
              this.currentUser$.next(this.currentUser);
            } else {
              this.currentUser = null;
              this.currentUser$.next(this.currentUser);
            }
          });
      }
    });

  }


  CurrentUser(): Observable<UserData>{
    return this.currentUser$.asObservable();
  }

  SignUp( email: string,
          password: string,
          firstName: string,
          lastName: string,
          avatar ): void{

    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res) {

          // tslint:disable-next-line:triple-equals
          if (avatar == undefined || avatar == ''){
            avatar = this.defaultAvatar;
          }
          this.afs.collection('users').doc(res.user.uid)
            .set({
              firstName,
              lastName,
              email,
              avatar
            }).then(() => {
            this.afs.collection<UserData>('users')
              .doc<UserData>(res.user.uid)
              .valueChanges()
              .subscribe(user => {
                if (user){
                  this.currentUser = user;
                  this.currentUser$.next(user);
                }
              });
          });
        }
      }).catch(err => console.log(err));
  }


  get UserData(): Observable<firebase.User>{
    return this._userData;
  }

  SignIn(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this._userData = this.afAuth.authState;
        this.afs.collection<UserData>('users')
          .doc<UserData>(res.user.uid)
          .valueChanges()
          .subscribe(user => {
            if (user){
              this.currentUser = user;
              this.currentUser$.next(this.currentUser);
            }
          });
      });
  }

  Logout(): void {
    this.afAuth.signOut().then(res => {
      this.currentUser = null;
      this.currentUser$.next(this.currentUser);
      this.router.navigateByUrl('/login').then();

    });
  }


// tslint:disable-next-line:variable-name
  searchuserInDatabase(user_id: string): Observable<UserData>{
    return  this.afs.collection<UserData>('users').doc<UserData>(user_id).valueChanges();
  }








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
export interface UserData {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  id?: string;
}

