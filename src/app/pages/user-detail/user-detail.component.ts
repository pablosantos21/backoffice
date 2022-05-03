import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  subscription!: Subscription;
  user!: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.user = {
      name: 'pablo',
      email: 'sd',
      birthdate: new Date(),
      username: 'pabs',
      isAdmin: true,
    };
    if (!username) {
      this.router.navigate(['/dashboard']);
    } else {
      this.subscription = this.userService
        .getUserByUsername(username)
        .subscribe((res) => console.log(res));
    }
  }
}
