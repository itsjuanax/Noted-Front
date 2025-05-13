import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalService } from 'src/app/services/journal/journal.service';
import { Journal } from 'src/app/models/journal.model';
import { FormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';


@Component({
  selector: 'app-journal-historial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './journal-historial.component.html',
  styleUrl: './journal-historial.component.scss'
})
export class JournalHistorialComponent implements OnInit {
  constructor(private journalService: JournalService, private alertService: AlertService) { }

  journals: Journal[] = [];
  editandoId: string | null = null;

  ngOnInit(): void {
    this.journalService.listarJournalEntries().subscribe({
      next: (res) => {
        this.journals = res;
        console.log('Journal entries cargados:', res);
      },
      error: (err) => {
        console.error('Error al cargar journal entries:', err);
      }
    });
  }

  activarEdicion(journalId: string) {
    this.editandoId = journalId;
  }

  cancelarEdicion() {
    this.editandoId = null;
  }

  guardarEdicion(journalId: string) {
    const journal = this.journals.find(j => j.id === journalId);

    if (journal) {
      const journalActualizado: Journal = {
        fecha: journal.fecha,
        titulo: journal.titulo,
        contenido: journal.contenido,
        emociones: journal.emociones,
        pensamientos: journal.pensamientos,
        notasAdicionales: journal.notasAdicionales

      };

      this.journalService.updateJournalEntry(journalId, journalActualizado).subscribe({
        next: (res) => {
          console.log('Journal entry actualizado:', res);
          this.alertService.alertaSuccess('success', 'Journal entry actualizado con éxito');
          this.cancelarEdicion();
          this.ngOnInit();
        },
        error: (err) => {
          console.error('Error al actualizar journal entry:', err);
        }
      });
    }
  }

  journalSeleccionado: Journal | null = null;
  modalAbierto: boolean = false;

  abrirModal(journal: Journal) {
  this.journalSeleccionado = journal;
  this.modalAbierto = true;
}

cerrarModal() {
  this.modalAbierto = false;
  this.journalSeleccionado = null;
}



}
