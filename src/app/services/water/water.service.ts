import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
    const volumenML = this.convertirAMililitros(cantidad, unidad);
    const body = {
      volumen: volumenML,
      fecha: new Date().toISOString().split('T')[0]  // formato YYYY-MM-DD
    };

    return this.http.post<Water>(`${this.apiUrl}/`, body, {
      headers: this.getHeaders()
    });
  }

  /**
   * Agrupa los registros por fecha y suma los volúmenes
   * Devuelve un array con: [{ fecha: '2025-05-11', total: 2000 }]
   */
  obtenerResumenDiario(): Observable<{ fecha: string; total: number }[]> {
    return this.listarWaters().pipe(
      map((waters) => {
        const resumen: { [fecha: string]: number } = {};

        for (const w of waters) {
          resumen[w.fecha] = (resumen[w.fecha] || 0) + w.volumen;
        }

        return Object.entries(resumen).map(([fecha, total]) => ({
          fecha,
          total
        }));
      })
    );
  }

  eliminarRegistro(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  private convertirAMililitros(cantidad: number, unidad: 'ml' | 'l' | 'oz'): number {
    switch (unidad) {
      case 'ml': return cantidad;
      case 'l': return cantidad * 1000;
      case 'oz': return cantidad * 29.5735; // 1 oz ≈ 29.57 ml
      default: throw new Error('Unidad no válida');
    }
  }
}
