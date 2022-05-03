import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  users: User[] = [];
  showUsers: User[] = [];
  numPage: number = 0;
  maxNumPage: number = 9999;
  subscription!: Subscription;
  isAdmin!: boolean;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.isAdmin.subscribe(
      (res) => (this.isAdmin = res)
    );
    this.subscription.add(
      this.userService.getUsers().subscribe((res: any) => {
        if (res && res.msg) {
          this.users = res.msg;
          this.maxNumPage = Math.ceil(this.users.length / 10);
          console.log(this.users.length);
          console.log(this.maxNumPage);
          this.showUsers = this.users.slice(this.numPage, this.numPage + 10);
        }
      })
    );
  }

  paginationUsers(num: number): void {
    this.numPage += num;
    const index = this.numPage * 10;
    this.showUsers = this.users.slice(index, index + 10);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
