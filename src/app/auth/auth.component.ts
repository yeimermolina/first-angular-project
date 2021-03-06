import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { AuthResponseData } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: String = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  handleCloseError() {
    this.error = null;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) return;

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObv: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObv = this.authService.signIn(email, password);
    } else {
      authObv = this.authService.signUp(email, password);
    }

    authObv.subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      (errorMsg) => {
        this.isLoading = false;
        this.error = errorMsg;
      }
    );

    authForm.reset();
  }
}
