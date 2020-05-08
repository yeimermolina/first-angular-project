import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
  kind: String;
  idToken: String;
  email: String;
  refreshToken: String;
  expiresIn: String;
  localId: String;
  registered?: Boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: String, password: String) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAn3JRPP_kq6DY0ZSzxoPOLp0Iu2bU3iEA",
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  signIn(email: String, password: String) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAn3JRPP_kq6DY0ZSzxoPOLp0Iu2bU3iEA",
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = "Something happened";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_NOT_FOUND":
        errorMsg = "Email not found";
        break;
      case "INVALID_PASSWORD":
        errorMsg = "Invalid Password";
        break;
      case "EMAIL_EXISTS":
        errorMsg = "Email exists";
        break;
    }

    return throwError(errorMsg);
  }
}
