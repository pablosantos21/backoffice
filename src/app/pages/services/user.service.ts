import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.api + 'back-office/';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.baseUrl + 'show');
  }

  getUser(username: string) {
    return this.http.get(this.baseUrl);
  }

  deleteUser(username: string) {
    return this.http.post(this.baseUrl, username);
  }
}
