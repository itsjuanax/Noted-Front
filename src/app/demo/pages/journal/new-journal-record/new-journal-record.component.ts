import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JournalService } from 'src/app/services/journal/journal.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-new-journal-record',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  templateUrl: './new-journal-record.component.html',
  styleUrl: './new-journal-record.component.scss'
})
export class NewJournalRecordComponent {

  constructor(private journalService: JournalService, private router: Router, private alertService: AlertService) { }

  journalForm = new FormGroup({
    fecha: new FormControl('', [Validators.required]),
    titulo: new FormControl('', [Validators.required]),
    contenido: new FormControl('', [Validators.required]),
    emociones: new FormControl(''),
    pensamientos: new FormControl(''),
    notasAdicionales: new FormControl(''),
  });  

  addJournal() {
    if (this.journalForm.invalid) return;

    const journal = {
      fecha: this.journalForm.value.fecha,
      titulo: this.journalForm.value.titulo,
      contenido: this.journalForm.value.contenido,
      emociones: this.journalForm.value.emociones,
      pensamientos: this.journalForm.value.pensamientos,
      notasAdicionales: this.journalForm.value.notasAdicionales
    };

    this.journalService.addJournalEntry(journal).subscribe({
      next: (res) => {
        console.log('Registro de diario agregado:', res);
        this.alertService.alertaSuccess('success', 'Registro de diario creado con éxito');
        this.router.navigate(['/journal/historial']);
      },
      error: (err) => {
        console.error('Error al agregar registro de diario:', err);
        this.alertService.alertaError('error', 'Error al crear el registro de diario');
      }
    });
  }

}
