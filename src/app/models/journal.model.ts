export interface Journal {
  id?: string;
  fecha: string;          
  titulo: string;
  contenido: string;
  emociones?: string;
  pensamientos?: string;
  notasAdicionales?: string;
  usuarioFk?: string;         
}