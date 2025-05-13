import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; 

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<any> {
    const endpoint = `${this.apiUrl}/`;
    return this.http.post(endpoint, user);
  }

  updateUsuario(userId: string, userData: Partial<User>){
    const endpoint = `${this.apiUrl}/${userId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }

    return this.http.put<User>(endpoint, userData, {headers});
  }

  changeUserStatus(userId?: string, estado?: string){
    const endpoint = `${this.apiUrl}/ChangeStatus/${userId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    const body = { estado };
    return this.http.post<User>(endpoint, body, {headers});
  }

  getUserById(userId: string): Observable<User> {
    const endpoint = `${this.apiUrl}/${userId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<User>(endpoint, {headers});
  }
}
