import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { catchError, tap, first, retry } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { NavController } from '@ionic/angular';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  timeout;
  constructor(private http: HttpClient, private navCtrl: NavController) { }

  signup(user) {
    return this.http.post(environment.baseUrl + '/signup', user).pipe(catchError(this.handleError), tap((res: any) => {
        return res
    }));
  }

  signin(user) {
    return this.http.post(environment.baseUrl + '/signin', user).pipe(catchError(this.handleError), tap((res: any) => {
      this.handleAuthentication(
        res['user']['_id'],
        res['user']['firstName'],
        res['user']['lastName'],
        res['user']['email'],
        res['user']['role'],        
        res['accessToken'],
        res['refreshToken'])
    })
    );
  }

  handleAuthentication(id, firstname, lastname, email, role, accessToken, refreshToken) {
    const user = new User(
      id,
      firstname,
      lastname,
      email,
      role,
      accessToken,
      refreshToken
    )
    
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.refreshToken(id, refreshToken, 30 * 60 * 1000);

  }

  refreshToken(id, refreshToken, timeout) {
      this.timeout = setTimeout(() => {
        this.http.post(environment.baseUrl + '/token', {'id': id, 'refreshToken': refreshToken}).pipe(
          retry(5)
        ).subscribe((res: any) => {
          this.handleAuthentication(
            res['user']['_id'],
            res['user']['firstName'],
            res['user']['lastName'],
            res['user']['email'],
            res['user']['role'],        
            res['accessToken'],
            res['refreshToken'])
        
        }, error => { 
          console.log(error)
          this.navCtrl.navigateForward('/tabs/signin');
        })
      }, timeout)
  }



  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      clearTimeout(this.timeout);
      return 
    }
    const loadedUser =  new User(
      userData.id,
      userData.firstname,
      userData.lastname,
      userData.email,
      userData.role,
      userData.accessToken,
      userData.refreshToken
    )

    if(loadedUser.token) {
      this.user.next(loadedUser);
      this.refreshToken(userData.id, userData.refreshToken, 1000);
    }
  }

  resetPasswordToken(data) {
    return this.http.post(environment.baseUrl + '/reset-password-token', data).pipe(catchError(this.handleError), tap((res: any) => {
      return res
    }));
  }

  resetPassword(data) {
    return this.http.post(environment.baseUrl + '/reset-password', data).pipe(catchError(this.handleError), tap((res: any) => {
      return res
    }));
  }

  logout() {
    this.user.next(null);
    clearTimeout(this.timeout);
    localStorage.clear();
  } 
  
  handleError(err: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occured!';
    if (!err.error) {
      return throwError(errorMessage);
    }
    switch(err.error.error) {
      case 'USER_EXISTS':
        errorMessage = 'This User is already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists';
        break;
      case 'INVALID_USER':
        errorMessage = 'Please Sign up';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'This Email is not correct';
        break;
      case 'INTERNAL_SERVER':
        errorMessage = 'Please Try again';
        break;
       case 'INVALID_PASSWORD':
         errorMessage = 'User Password is Invalid'
         break; 
        case 'TOKEN_EXPIRES':
          errorMessage = 'Token Expires'
          break;
    }
    return throwError(errorMessage);
  }
}
