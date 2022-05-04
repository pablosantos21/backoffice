import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() logged: boolean = false;
  @Input() admin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toHomePage() {
    if (this.logged == false) {
      this.router.navigate(['homePage']);
    } else {
      if (this.admin == false) {
        this.router.navigate(['loggedHomePage']);
      } else {
        this.router.navigate(['adminHomePage']);
      }
    }
  }

  toLogIn() {
    this.router.navigate(['login']);
  }
  toSignUp() {
    this.router.navigate(['register']);
  }
}