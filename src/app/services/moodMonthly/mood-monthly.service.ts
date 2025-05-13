import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoodMonthly } from 'src/app/models/moodMonthly';

@Injectable({
  providedIn: 'root'
})
export class MoodMonthlyService {
  private apiUrl = 'http://localhost:3000/api/moodMTrackers';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}` // Corregido: Usar backticks
    });
  }

  getMoodsMonthly(): Observable<MoodMonthly[]> {
    return this.http.get<MoodMonthly[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  addMoodMonthly(data: MoodMonthly): Observable<MoodMonthly> {
    return this.http.post<MoodMonthly>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  updateMoodMonthly(id: string, data: Partial<MoodMonthly>): Observable<MoodMonthly> {
    return this.http.put<MoodMonthly>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() }); // Corregido: Usar backticks
  }
}