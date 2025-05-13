export interface Evento {
    id?: string;        
    titulo: string;
    fecha: string;     
    hora?: string;       
    descripcion?: string;
    usuarioFk?: string;  
}
  