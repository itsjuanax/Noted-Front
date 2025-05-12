import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterService } from 'src/app/services/water/water.service';
import { Water } from 'src/app/models/water.model';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';



@Component({
  selector: 'app-registro-water',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-water.component.html',
  styleUrl: './registro-water.component.scss'
})
export class RegistroWaterComponent {

  constructor(private waterService: WaterService, private router: Router, private alertService: AlertService) { }

  waterForm = new FormGroup({
    fecha: new FormControl('', [Validators.required]),
    litrosTomadosDia: new FormControl('', [Validators.required, Validators.min(0)]),
  });


  addWater() {
    if (this.waterForm.invalid) return;

    const water: Water = {
      fecha: this.waterForm.value.fecha,
      litrosTomadosDia: Number(this.waterForm.value.litrosTomadosDia),
    };

    this.waterService.addWaterTracker(water).subscribe({
      next: (res) => {
        console.log(res);
        this.alertService.alertaSuccess('Agua registrada con éxito', 'Ya puedes ver tu historial');
        this.router.navigate(['/waterTracker/historial']);
      },
      error: (err) => {
        console.log(err);
        this.alertService.alertaError('Error al registrar el agua', 'Asegúrate de que todos los campos sean correctos');
      }
    });
  }
}
