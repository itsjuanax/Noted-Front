export interface MoodWeekly {
  id?: string;
  fecha: string;
  enojo: number;
  miedo: number;
  alegria: number;
  tristeza: number;
  culpa: number;
  desesperanza: number;
  frustracion: number;
  otras: number;
  usuarioFk?: string;
}