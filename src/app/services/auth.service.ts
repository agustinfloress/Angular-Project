import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token!: string;

  private _user: any = {
    isAuth: false,
    isAdmin: false,
    user: undefined
  }

  constructor(private http: HttpClient) {}

  loginUser({username, password}: any): Observable<any>{
    return this.http.post<any>('http://localhost:8087/login', {username, password});
  }

  setUser(user: any){
    this._user = user;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  get user(){
    if(this._user.isAuth){
      return this._user;
    }else if(sessionStorage.getItem('user') != null){
      this._user = JSON.parse(sessionStorage.getItem('user') || '{}'); 
      return this._user;
    }
    return this._user;
  }

  setToken(token: string){
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  get token(){
    if(this._token != undefined){
      return this._token;
    }else if(sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return this._token;
  }

  isAdmin(){
    return this.user.isAdmin;
  }

  isAuth(){
    return this.user.isAuth;
  }

  logout(){
    this._token = '';
    this._user = {
      isAuth: false,
      isAdmin: false,
      user: undefined
    };
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

}
