import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id) {
    return this.http.post(environment.baseUrl + '/get-user', {'id': id});
  }

  updateUser(user) {
    return this.http.post(environment.baseUrl + '/update-user', {'user': user});
  }

}
