import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sleep } from 'src/app/models/sleep.model';

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  private apiUrl = 'http://localhost:3000/api/sleepTrackers';

  constructor(private http: HttpClient) { }

  listarSleepTrackers(): Observable<Sleep[]> {
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });

    return this.http.get<Sleep[]>(endpoint, { headers });
  }

  addSleepTracker(sleep: Sleep): Observable<Sleep> {
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.post<Sleep>(endpoint, sleep, { headers });
  }

  updateSleepTracker(sleepId: string, sleep: Sleep): Observable<Sleep> {
    const endpoint = `${this.apiUrl}/${sleepId}`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.put<Sleep>(endpoint, sleep, { headers });
  }


}
