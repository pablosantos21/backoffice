import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  user!: User;
  isAdmin!: boolean;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.user = {
      name: 'pablo',
      email: 'sd',
      birthdate: new Date(),
      username: 'pabs',
      isAdmin: true,
    };
  }
  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.subscription = this.authService.user.subscribe(
      (res) => (this.isAdmin = res.isAdmin)
    );
    if (!username) {
      this.router.navigate(['/dashboard']);
    } else {
      this.subscription.add(
        this.userService.getUser(username).subscribe((res) => console.log(res))
      );
    }
  }

  editUser() {
    alert(JSON.stringify(this.user));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
