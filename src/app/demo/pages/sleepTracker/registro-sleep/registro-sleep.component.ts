import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SleepService } from 'src/app/services/sleep/sleep.service';
import { Sleep } from 'src/app/models/sleep.model';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-registro-sleep',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registro-sleep.component.html',
  styleUrl: './registro-sleep.component.scss'
})
export class RegistroSleepComponent {
  constructor(
    private sleepService: SleepService, 
    private router: Router,
    private alertService: AlertService
  ) { }

  sleepForm = new FormGroup({
    fecha: new FormControl('', [Validators.required]),
    horaDormir: new FormControl('', [Validators.required]),
    horaDespertar: new FormControl('', [Validators.required]),
    calidad: new FormControl('', [Validators.required]),
    sueno: new FormControl('', [Validators.required]),
    notasAdicionales: new FormControl('')
  });

  addSleep() {
    if (this.sleepForm.invalid) return;

    const horaDormir = this.sleepForm.value.horaDormir!;
    const horaDespertar = this.sleepForm.value.horaDespertar!;

    const duracion = this.calcularDuracion(horaDormir, horaDespertar);

    const sleep: Sleep = {
      fecha: this.sleepForm.value.fecha!,
      horaDormir,
      horaDespertar,
      duracion,
      calidad: Number(this.sleepForm.value.calidad),
      sueno: this.sleepForm.value.sueno!,
      notasAdicionales: this.sleepForm.value.notasAdicionales
    };

    this.sleepService.addSleepTracker(sleep).subscribe({
      next: (res) => {
        console.log('Sleep tracker agregado:', res);
        this.alertService.alertaSuccess('Success','Registro de sueño creado con éxito');
        this.router.navigate(['/sleepTrackers/historial']);
      },
      error: (err) => {
        console.error('Error al agregar sleep tracker:', err);
        this.alertService.alertaError('Error', 'Error al crear el registro de sueño');
      }
    });
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
