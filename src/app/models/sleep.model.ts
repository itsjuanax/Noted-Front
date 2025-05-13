export interface Sleep {
  id?: string; 
  fecha: string; 
  horaDormir: string; 
  horaDespertar: string;
  duracion: number;
  calidad: number;
  sueno: string; 
  notasAdicionales?: string; 
  usuarioFk?: string; 
}
