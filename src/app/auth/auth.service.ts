import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCP85kY1bEC--ZfpI-MO4ueweDmnSYOZvs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorRes => {
        console.log(errorRes);
        let error = 'error';
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
          default:
            error = 'An unknown error occured';
            break;
        }

        return throwError(error);
      })
    )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCP85kY1bEC--ZfpI-MO4ueweDmnSYOZvs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
  }
}
