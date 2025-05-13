import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SleepService } from 'src/app/services/sleep/sleep.service';
import { Sleep } from 'src/app/models/sleep.model';
import { FormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent implements OnInit {
  constructor(
    private sleepService: SleepService,
    private alertService: AlertService
  ) { }

  sleeps: Sleep[] = [];

  ngOnInit(): void {
    this.sleepService.listarSleepTrackers().subscribe({
      next: (res) => {
        this.sleeps = res;
        console.log('Sleeps cargados:', res);
      },
      error: (err) => {
        console.error('Error al cargar sleeps:', err);
      }
    });
  }

  formatDuration(duracionMinutos: number): string {
    const horas = Math.floor(duracionMinutos / 60);
    const minutos = duracionMinutos % 60;
    return `${horas}h ${minutos}m`;
  }

  editandoId: string | null = null;

  activarEdicion(sleepId: string) {
    this.editandoId = sleepId;
  }

  cancelarEdicion() {
    this.editandoId = null;
  }

  guardarEdicion(sleepId: string) {
    const sleep = this.sleeps.find(s => s.id === sleepId);

    if (sleep) {
      const duracion = this.calcularDuracion(sleep.horaDormir, sleep.horaDespertar);

      const sleepActualizado: Sleep = {
        fecha: sleep.fecha,
        horaDormir: sleep.horaDormir,
        horaDespertar: sleep.horaDespertar,
        duracion,
        calidad: sleep.calidad,
        sueno: sleep.sueno,
        notasAdicionales: sleep.notasAdicionales
      };

      this.sleepService.updateSleepTracker(sleepId, sleepActualizado).subscribe({
        next: (res) => {
          console.log('Sleep actualizado:', res);
          this.alertService.alertaSuccess('success', 'Registro actualizado con éxito');
          this.editandoId = null;
          this.ngOnInit();
        },
        error: (err) => {
          console.error('Error actualizando sleep:', err);
          this.alertService.alertaError('Error al actualizar el registro', '');
        }
      });
    }
  }

  calcularDuracion(horaDormir: string, horaDespertar: string): number {
    const [h1, m1] = horaDormir.split(':').map(Number);
    const [h2, m2] = horaDespertar.split(':').map(Number);

    let minutosDormir = h1 * 60 + m1;
    let minutosDespertar = h2 * 60 + m2;

    let duracionMinutos = minutosDespertar - minutosDormir;
    if (duracionMinutos <= 0) {
      duracionMinutos += 24 * 60;
    }

    return duracionMinutos;
  }

}
