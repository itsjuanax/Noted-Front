import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Journal } from 'src/app/models/journal.model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private apiUrl = 'http://localhost:3000/api/journal';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
  }

  listarEntradas(): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  agregarEntrada(journal: Journal): Observable<Journal> {
    return this.http.post<Journal>(this.apiUrl, journal, {
      headers: this.getHeaders()
    });
  }

  actualizarEntrada(id: string, journal: Partial<Journal>): Observable<Journal> {
    return this.http.put<Journal>(`${this.apiUrl}/${id}`, journal, {
      headers: this.getHeaders()
    });
  }
}