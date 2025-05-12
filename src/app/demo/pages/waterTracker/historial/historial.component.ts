import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterService } from 'src/app/services/water/water.service';
import { Water } from 'src/app/models/water.model';
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
  constructor(private waterService: WaterService, private alertService: AlertService) { }

  waters: Water[] = [];
  editandoId: string | null = null;

  get totalRegistros(): number {
    return this.waters.length;
  }

  get totalCumplidos(): number {
    return this.waters.filter(w => w.litrosTomadosDia >= 2).length;
  }

  get porcentajeCumplimiento(): number {
    if (this.totalRegistros === 0) return 0;
    return Math.round((this.totalCumplidos / this.totalRegistros) * 100);
  }


  ngOnInit(): void {
    this.waterService.listarWaterTrackers().subscribe({
      next: (res) => {
        this.waters = res;
        console.log('Waters cargados:', res);
      },
      error: (err) => {
        console.error('Error al cargar waters:', err);
      }
    });
  }

  activarEdicion(waterId: string) {
    this.editandoId = waterId;
  }

  cancelarEdicion() {
    this.editandoId = null;
  }

  guardarEdicion(waterId: string) {
    const water = this.waters.find(w => w.id === waterId);

    if (water) {
      const waterActualizado: Water = {
        fecha: water.fecha,
        litrosTomadosDia: water.litrosTomadosDia
      };

      this.waterService.updateWaterTracker(waterId, waterActualizado).subscribe({
        next: (res) => {
          console.log('Water actualizado:', res);

          if (waterActualizado.litrosTomadosDia >= 2) {
            this.alertService.alertaCumplimientoMeta();
          }

          this.alertService.alertaSuccess('success', 'Registro actualizado exitosamente');
          this.editandoId = null;
          this.ngOnInit();
        },
        error: (err) => {
          console.error('Error actualizando water:', err);
          this.alertService.alertaError('Error al actualizar el registro', 'Asegúrate de que todos los campos sean correctos.');
        }
      });
    }
  }

}
