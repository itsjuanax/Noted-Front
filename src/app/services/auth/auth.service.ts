import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const endpoint = `${this.apiUrl}/login`;
    const body = { email, password };
    return this.http.post(endpoint, body);
  }
}
