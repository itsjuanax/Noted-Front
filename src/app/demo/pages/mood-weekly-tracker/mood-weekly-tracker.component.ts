import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MoodWeeklyService } from 'src/app/services/moodWeekly/mood-weekly.service';
import { MoodWeekly } from 'src/app/models/moodWeekly.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service'

@Component({
  selector: 'app-mood-weekly-tracker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mood-weekly-tracker.component.html',
  styleUrl: './mood-weekly-tracker.component.scss'
})
export class MoodWeeklyTrackerComponent implements OnInit {
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  emociones = ['enojo', 'miedo', 'alegria', 'tristeza', 'culpa', 'desesperanza', 'frustracion'];
  semana: Date[] = [];
  forms: { [fecha: string]: FormGroup } = {};
  registros: { [fecha: string]: string } = {};
  semanaIndex = 0;
  rangoSemana = '';
  otrosLista: { fecha: string, valor: number }[] = [];

  constructor(private service: MoodWeeklyService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.cargarSemana();
    this.cargarDatos();
  }

  cargarSemana(): void {
    const hoy = new Date();
    const base = new Date(hoy);
    base.setDate(hoy.getDate() + this.semanaIndex * 7);
    const dia = base.getDay() === 0 ? 7 : base.getDay();
    const lunes = new Date(base);
    lunes.setDate(base.getDate() - (dia - 1));

    this.semana = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(lunes);
      d.setDate(lunes.getDate() + i);
      return d;
    });

    const inicio = this.semana[0];
    const fin = this.semana[6];
    const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    this.rangoSemana = `Semana del ${inicio.toLocaleDateString('es-ES', opciones)} al ${fin.toLocaleDateString('es-ES', opciones)}`;

    this.forms = {};
    this.otrosLista = [];
    this.semana.forEach(fecha => {
      const f = this.formatDateLocal(fecha);
      this.forms[f] = new FormGroup({
        ...this.emociones.reduce((acc, emo) => {
          acc[emo] = new FormControl(0, [Validators.min(0), Validators.max(5)]);
          return acc;
        }, {} as any),
        otras: new FormControl(0, [Validators.min(0), Validators.max(5)])
      });
    });
  }

  cargarDatos(): void {
  this.service.listarMoodWeekly().subscribe({
    next: moods => {
      if (!moods || moods.length === 0) {
        this.registros = {};
        this.otrosLista = [];
        return;
      }

      moods.forEach(m => {
        const fechaStr = m.fecha.split('T')[0]; // <-- sin hacer new Date()

        if (this.forms[fechaStr]) {
          this.forms[fechaStr].patchValue({
            enojo: m.enojo ?? 0,
            miedo: m.miedo ?? 0,
            alegria: m.alegria ?? 0,
            tristeza: m.tristeza ?? 0,
            culpa: m.culpa ?? 0,
            desesperanza: m.desesperanza ?? 0,
            frustracion: m.frustracion ?? 0,
            otras: m.otras ?? 0
          });
          this.registros[fechaStr] = m.id;
          if (m.otras && m.otras > 0) {
            this.otrosLista.push({ fecha: fechaStr, valor: m.otras });
          }
        } else {
          console.warn('Fecha no encontrada en forms:', fechaStr);
        }
      });
    },
    error: () => this.alertService.alertaError('Error','Error al cargar moods')
  });
}

  guardar(fecha: Date): void {
    const f = this.formatDateLocal(fecha);
    const data = this.forms[f].value;
    data.fecha = f;

    if (this.registros[f]) {
      this.service.updateMoodWeekly(this.registros[f], data).subscribe({
        next: () => this.alertService.alertaSuccess('Success',`Mood del ${f} actualizado.`),
        error: () => this.alertService.alertaError('Error',`Error al actualizar el mood del ${f}.`)
      });
    } else {
      this.service.addMoodWeekly(data).subscribe({
        next: (created) => {
          this.registros[f] = created.id!;
          if (created.otras && created.otras > 0) {
            this.otrosLista.push({ fecha: f, valor: created.otras });
          }
          this.alertService.alertaSuccess('Success',`Mood del ${f} guardado correctamente.`);
        },
        error: () => this.alertService.alertaError('Error',`Error al guardar mood del ${f}.`)
      });
    }
  }

  anterior(): void {
    this.semanaIndex--;
    this.cargarSemana();
    this.cargarDatos();
  }

  siguiente(): void {
    this.semanaIndex++;
    this.cargarSemana();
    this.cargarDatos();
  }

  hoy(): void {
    this.semanaIndex = 0;
    this.cargarSemana();
    this.cargarDatos();
  }

  getFormControl(fecha: string, emo: string): FormControl {
    return this.forms[fecha].get(emo) as FormControl;
  }

  private formatDateLocal(fecha: Date): string {
    return fecha.getFullYear() + '-' +
           String(fecha.getMonth() + 1).padStart(2, '0') + '-' +
           String(fecha.getDate()).padStart(2, '0');
  }

  getFechaFormateada(fecha: Date): string {
  return this.formatDateLocal(fecha);
}

}
