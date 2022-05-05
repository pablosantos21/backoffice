import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  usernameOrEmail!: string;
  password!: string;

  subscription!: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    const credentials = {
      username: this.usernameOrEmail,
      password: this.password,
    };

    this.subscription = this.authService
      .signIn(credentials)
      .subscribe((res: any) => {
        if (res && res.access_token) {
          this.authService.user.next({
            isAdmin: res.isAdmin,
            token: res.access_token,
          });

          localStorage.setItem('token', res.access_token);
          this.router.navigate(['dashboard']);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
