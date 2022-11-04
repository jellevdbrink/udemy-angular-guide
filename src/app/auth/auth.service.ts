import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  logoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.idToken, +resData.expiresIn);
    }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.idToken, +resData.expiresIn);
    }))
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');

    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;

    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  handleAuthentication(email: string, localId: string, idToken: string, token: string, expiresIn: number) {
    const exiprationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, exiprationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
        let error = 'error';
        if (!errorRes.error.error || !errorRes.error) {
          error = 'An unknown error occured';
        } else {
          switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              error = 'That email is already being used by another user';
              break;
            case 'OPERATION_NOT_ALLOWED':
              error = 'Password sign-in is disabled for this project.';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              error = 'You have tried too many times, try again later';
              break;
            case 'EMAIL_NOT_FOUND':
              error = 'There is no account with that email';
              break;
            case 'INVALID_PASSWORD':
              error = 'That is an incorrect password';
              break;
            default:
              error = 'An unknown error occured';
              break;
          }
        }

        return throwError(error);
  }
}
