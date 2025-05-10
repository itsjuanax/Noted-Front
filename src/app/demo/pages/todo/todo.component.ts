import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/app/services/tarea/tarea.service';
import { Tarea } from 'src/app/models/tarea.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private tareaService: TareaService) { }

  tareaForm = new FormGroup({
    titulo: new FormControl('', [Validators.required])
  });

  tareas: Tarea[] = [];

  ngOnInit(): void {
    this.tareaService.listarTareas().subscribe({
      next: (res) => {
        this.tareas = res;
        console.log('Tareas cargadas:', res);
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
      }
    });
  }

  addTarea() {
    if (this.tareaForm.invalid) return;

    const tarea: Tarea = {
      titulo: this.tareaForm.value.titulo,
      completada: false,
    };

    this.tareaService.addTarea(tarea).subscribe({
      next: (res) => {
        this.tareas.push(res);
        console.log('Tarea agregada:', res);
        this.tareaForm.reset(); // Resetear el formulario después de agregar la tarea
      },
      error: (err) => {
        console.error('Error al agregar tarea:', err);
      }
    });
  }

  toggleCompletada(tarea: Tarea) {
    const nuevoEstado = !tarea.completada;
  
    this.tareaService.updateTarea(tarea.id!, {
      completada: nuevoEstado
    }).subscribe({
      next: () => {
        tarea.completada = nuevoEstado;
      },
      error: (err) => console.error('Error al cambiar estado de completada:', err)
    });
  }
  
  
  
  editandoId: string | null = null;
  tareaEditada: string = '';

  editarTarea(tarea: Tarea) {
    this.editandoId = tarea.id!;
    this.tareaEditada = tarea.titulo;
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.tareaEditada = '';
  }

  guardarEdicion(tarea: Tarea) {
    const nuevoTitulo = this.tareaEditada.trim();
    if (!nuevoTitulo) return;

    this.tareaService.updateTarea(tarea.id!, {
      titulo: nuevoTitulo,
      completada: tarea.completada
    }).subscribe({
      next: () => {
        tarea.titulo = nuevoTitulo;
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error al editar tarea:', err)
    });
  }

  eliminarTarea(tareaId: string) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta tarea?')) return;
  
    this.tareaService.deleteTarea(tareaId).subscribe({
      next: () => {
        this.tareas = this.tareas.filter(t => t.id !== tareaId);
      },
      error: (err) => console.error('Error al eliminar tarea:', err)
    });
  }
  
}
