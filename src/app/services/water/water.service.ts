import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Water } from 'src/app/models/water.model';

@Injectable({
  providedIn: 'root'
})
export class WaterService {
  private apiUrl = 'http://localhost:3000/api/water';

  unidadesDisponibles: { label: string; value: 'ml' | 'l' | 'oz' }[] = [
    { label: 'Mililitros (ml)', value: 'ml' },
    { label: 'Litros (l)', value: 'l' },
    { label: 'Onzas (oz)', value: 'oz' },
  ];

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });
  }

  listarWaters(): Observable<Water[]> {
    return this.http.get<Water[]>(`${this.apiUrl}/`, {
      headers: this.getHeaders()
    });
  }

  registrarConsumo(cantidad: number, unidad: 'ml' | 'l' | 'oz'): Observable<Water> {
    const volumenML = this.convertirMililitros(cantidad, unidad);
    const body = {
      volumen: volumenML,
      fecha: new Date().toISOString().split('T')[0]  // formato YYYY-MM-DD
    };

    return this.http.post<Water>(`${this.apiUrl}/`, body, {
      headers: this.getHeaders()
    });
  }

  private convertirMililitros(cantidad: number, unidad: 'ml' | 'l' | 'oz'): number {
    switch (unidad) {
      case 'ml': return cantidad;
      case 'l': return cantidad * 1000;
      case 'oz': return cantidad * 29.5735;
      default: throw new Error('Unidad no válida');
    }
  }
}

