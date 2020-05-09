import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user. model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: Boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  //behavior keeps in memory the previous value, subject doesnt
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any = null;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAn3JRPP_kq6DY0ZSzxoPOLp0Iu2bU3iEA",
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.setUser(res.email, res.localId, res.idToken, +res.expiresIn);
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAn3JRPP_kq6DY0ZSzxoPOLp0Iu2bU3iEA",
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.setUser(res.email, res.localId, res.idToken, +res.expiresIn);
        })
      );
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem("user");
    this.router.navigate(["/auth"]);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
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

  autoLogin() {
    const user: {
      email: string;
      localId: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return;
    }

    const loadedUser = new User(
      user.email,
      user.localId,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (loadedUser.token) {
      const expirationDuration =
        new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  private setUser(
    email: string,
    localId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, token, expirationDate);
    localStorage.setItem("user", JSON.stringify(user));
    this.autoLogOut(expiresIn * 1000);

    this.user.next(user);
  }
}
