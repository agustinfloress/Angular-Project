import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]>{
    //return of(this.users);
    return this.http.get<User[]>('http://localhost:8087/api');
  }
  
  findAllPage(page: number): Observable<any>{
    return this.http.get<any>('http://localhost:8087/api/page' + '/' + page);
  }

  findById(id: number): Observable<User>{
    return this.http.get<User>('http://localhost:8087/api' + '/' + id);
  }

  create(user: User): Observable<User>{
    return this.http.post<User>('http://localhost:8087/api', user);
  }

  update(user: User): Observable<User>{
    return this.http.put<User>('http://localhost:8087/api/update' + '/' + user.id, user);
  }

  delete(id: number): Observable<User>{
    return this.http.delete<User>('http://localhost:8087/api' + '/' + id);
  }


}
