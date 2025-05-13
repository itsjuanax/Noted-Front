import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Journal } from 'src/app/models/journal.model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  private apiUrl = 'http://localhost:3000/api/journalEntries';

  constructor(private http: HttpClient) { }

  listarJournalEntries(): Observable<Journal[]> {
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });

    return this.http.get<Journal[]>(endpoint, { headers });
  }

  addJournalEntry(journal: Journal): Observable<Journal> {
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.post<Journal>(endpoint, journal, { headers });
  }

  updateJournalEntry(journalId: string, journal: Journal): Observable<Journal> {
    const endpoint = `${this.apiUrl}/${journalId}`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.put<Journal>(endpoint, journal, { headers });
  }
}
