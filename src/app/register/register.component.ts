import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  username!: string;
  name!: string;
  email!: string;
  password!: string;
  birthdate!: Date;
  isAdmin: boolean = false;

  subscription!: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    const credentials = {
      username: this.username,
      name: this.name,
      email: this.email,
      password: this.password,
      birthdate: this.birthdate,
      isAdmin: this.isAdmin,
    };
    console.log(credentials);

    this.subscription = this.authService
      .signUp(credentials)
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.access_token) {
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
