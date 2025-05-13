import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Water } from 'src/app/models/water.model';

@Injectable({
  providedIn: 'root'
})
export class WaterService {

  private apiUrl = 'http://localhost:3000/api/waterTrackers';

  constructor(private http: HttpClient) { }

  listarWaterTrackers(): Observable<Water[]> {
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });

    return this.http.get<Water[]>(endpoint, { headers });
  }

  addWaterTracker(water: Water): Observable<Water> {
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.post<Water>(endpoint, water, { headers });
  }

  updateWaterTracker(waterId: string, water: Water): Observable<Water> {
    const endpoint = `${this.apiUrl}/${waterId}`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.http.put<Water>(endpoint, water, { headers });
  }

  
}
