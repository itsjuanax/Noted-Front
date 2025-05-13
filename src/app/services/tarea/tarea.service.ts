import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from 'src/app/models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl = 'http://localhost:3000/api/tareas'; 

  constructor(private http: HttpClient) { }

  listarTareas(){
    const endpoint = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    });

    return this.http.get<Tarea[]>(endpoint, { headers });
  }

  addTarea(tarea: Tarea){
    const endpoint = `${this.apiUrl}/`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }

    return this.http.post<Tarea>(endpoint, tarea, { headers });
  }
 
  updateTarea(tareaId: string, tarea: Partial<Tarea>){

    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    const endpoint = `${this.apiUrl}/${tareaId}`;
    return this.http.put<Tarea>(endpoint, tarea, { headers });
  }

  deleteTarea(tareaId: string){
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    const endpoint = `${this.apiUrl}/${tareaId}`;
    return this.http.delete<Tarea>(endpoint, { headers });
  }
}
