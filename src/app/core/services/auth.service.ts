import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.api;
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  signIn(credentials: any) {
    return this.http.post(this.baseUrl + 'auth/signin', credentials);
  }

  signUp(credentials: any) {
    return this.http.post(this.baseUrl + 'auth/signup', credentials);
  }
}
