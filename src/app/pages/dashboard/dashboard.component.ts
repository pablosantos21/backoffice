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
  showUsers: User[] = [
    // {
    //   name: 'Borja',
    //   username: 'CssExpert',
    //   email: 'borja@borja.com',
    //   birthdate: new Date('1999-01-16'),
    //   isAdmin: false,
    // },
    // {
    //   name: 'Pablo',
    //   username: 'CapitanAlMando',
    //   email: 'pablo@pablo.com',
    //   birthdate: new Date('1997-01-16'),
    //   isAdmin: false,
    // },
    // {
    //   name: 'Héctor',
    //   username: 'MisterMaquinaria',
    //   email: 'hector@hector.com',
    //   birthdate: new Date('1999-01-16'),
    //   isAdmin: false,
    // },
    // {
    //   name: 'Adam',
    //   username: 'Lavaplatos',
    //   email: 'adam@adam.com',
    //   birthdate: new Date('1997-01-16'),
    //   isAdmin: false,
    // },
  ];
  numPage: number = 0;
  maxNumPage: number = 9999;
  subscription!: Subscription;
  isAdmin!: boolean;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(
      (res) => (this.isAdmin = res.isAdmin)
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

  deleteUser(username: string) {
    this.userService.deleteUser(username).subscribe((res) => console.log(res));
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
