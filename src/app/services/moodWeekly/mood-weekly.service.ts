import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoodWeekly } from 'src/app/models/moodWeekly.model';

@Injectable({
  providedIn: 'root'
})
export class MoodWeeklyService {

  private apiUrl = 'http://localhost:3000/api/moodWTrackers';

  constructor(
    private http: HttpClient
  ) { }

  listarMoodWeekly(): Observable<MoodWeekly[]> {
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });

    return this.http.get<MoodWeekly[]>(endpoint, { headers });
  }

  addMoodWeekly(moodWeekly: MoodWeekly): Observable<MoodWeekly> {
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.post<MoodWeekly>(endpoint, moodWeekly, { headers });
  }

  updateMoodWeekly(moodWeeklyId: string, moodWeekly: MoodWeekly): Observable<MoodWeekly> {
    const endpoint = `${this.apiUrl}/${moodWeeklyId}`;
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.put<MoodWeekly>(endpoint, moodWeekly, { headers });
  }
}
