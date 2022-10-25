import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCP85kY1bEC--ZfpI-MO4ueweDmnSYOZvs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleuserLogin(resData.email, resData.localId, resData.idToken, resData.idToken, +resData.expiresIn);
    }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCP85kY1bEC--ZfpI-MO4ueweDmnSYOZvs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleuserLogin(resData.email, resData.localId, resData.idToken, resData.idToken, +resData.expiresIn);
    }))
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  handleuserLogin(email: string, localId: string, idToken: string, token: string, expiresIn: number) {
    const exiprationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, exiprationDate);
    this.user.next(user);
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
