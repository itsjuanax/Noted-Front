import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiUrl = 'http://localhost:3000/api/eventos';

  constructor(private http: HttpClient) { }

  listarEventos(): Observable<Evento[]> {
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });

    return this.http.get<Evento[]>(endpoint, { headers });
  }

  addEvento(evento: Evento): Observable<Evento> {
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.post<Evento>(endpoint, evento, { headers });
  }

  updateEvento(eventoId: string, evento: Evento): Observable<Evento> {
    const endpoint = `${this.apiUrl}/${eventoId}`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.put<Evento>(endpoint, evento, { headers });
  }

  deleteEvento(eventoId: string): Observable<Evento> {
    const endpoint = `${this.apiUrl}/${eventoId}`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.delete<Evento>(endpoint, { headers });
  }
}
