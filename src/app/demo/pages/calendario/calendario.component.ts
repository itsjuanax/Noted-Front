import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento/evento.service';
import { Evento } from 'src/app/models/evento.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit {
  eventos: Evento[] = [];
  diasDelMes: Date[] = [];
  mesActual: number = new Date().getMonth();
  anioActual: number = new Date().getFullYear(); 

  eventForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
    hora: new FormControl('')
  });

  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  constructor(private eventoService: EventoService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.eventoService.listarEventos().subscribe({
      next: (res) => {
        this.eventos = res;
        console.log('Eventos cargados:', res);
      },
      error: (err) => {
        console.error('Error al cargar eventos:', err);
      }
    });

    this.generarDiasDelMes();

    
  }

  generarDiasDelMes() {
    const dias: (Date | null)[] = [];
    const primerDia = new Date(this.anioActual, this.mesActual, 1);
    const ultimoDia = new Date(this.anioActual, this.mesActual + 1, 0);
  
    const primerDiaSemana = primerDia.getDay(); 
  
    for (let i = 0; i < primerDiaSemana; i++) {
      dias.push(null); 
    }
  
    for (let d = 1; d <= ultimoDia.getDate(); d++) {
      dias.push(new Date(this.anioActual, this.mesActual, d));
    }
  
    this.diasDelMes = dias;
  }
  

  eventosDelDia(dia: Date): Evento[] {
    const year = dia.getFullYear();
    const month = (dia.getMonth() + 1).toString().padStart(2, '0');
    const day = dia.getDate().toString().padStart(2, '0');
  
    const fechaLocal = `${year}-${month}-${day}`;
  
    return this.eventos.filter(evento => {
      const fechaEvento = evento.fecha.split('T')[0];
      return fechaEvento === fechaLocal;
    });
  }
  
  mesAnterior() {
    if (this.mesActual === 0) {
      this.mesActual = 11;
      this.anioActual--;
    } else {
      this.mesActual--;
    }
    this.generarDiasDelMes(); 
  }
  
  mesSiguiente() {
    if (this.mesActual === 11) {
      this.mesActual = 0;
      this.anioActual++;
    } else {
      this.mesActual++;
    }
    this.generarDiasDelMes();
  }

  irAHoy() { //Boton para volver al mes actual
    const hoy = new Date();
    this.mesActual = hoy.getMonth(); 
    this.anioActual = hoy.getFullYear();
    this.generarDiasDelMes();
  }

  mostrarCrearModal = false;
  mostrarDetallesModal = false;
  diaSeleccionado: Date | null = null;
  eventoSeleccionado: Evento | null = null;

  abrirCrearEvento(dia: Date) {
    this.diaSeleccionado = dia;
    this.mostrarCrearModal = true;
  }

  crearEvento() {
    if(this.eventForm.invalid) return; 

    const year = this.diaSeleccionado.getFullYear();
    const month = (this.diaSeleccionado.getMonth() + 1).toString().padStart(2, '0');
    const day = this.diaSeleccionado.getDate().toString().padStart(2, '0');
    const fecha = `${year}-${month}-${day}`;

    const nuevoEvento: { titulo: string; fecha: string; descripcion: string | null; hora?: string | null } = {
      titulo: this.eventForm.value.titulo,
      fecha: fecha,
      descripcion: this.eventForm.value.descripcion || null,
    };

    if (this.eventForm.value.hora) {
      nuevoEvento.hora = this.eventForm.value.hora;
    }

    this.eventoService.addEvento(nuevoEvento).subscribe({
      next: (eventoCreado) => {
        this.eventos.push(eventoCreado);
        this.alertService.alertaSuccess('Evento creado con éxito','');
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al crear evento:', err);
        this.alertService.alertaError('Error al crear evento','');
      }
    });
  }
  
  cerrarModal() {
    this.mostrarCrearModal = false;
    this.mostrarDetallesModal = false;
    this.diaSeleccionado = null;
    this.eventoSeleccionado = null;
    this.modoEdicion = false;
    this.idEventoEditando = null;
  
    if (this.eventForm) {
      this.eventForm.reset();
    }
  }
  

  verEvento(evento: Evento, event: MouseEvent) {
    event.stopPropagation(); // Evitar que el evento de clic se propague al contenedor del día
    this.eventoSeleccionado = evento;
    this.mostrarDetallesModal = true;
  }
  
  modoEdicion = false;
  idEventoEditando: string | null = null;

  editarEvento() {
    if (!this.eventoSeleccionado) return;
  
    this.eventForm.setValue({
      titulo: this.eventoSeleccionado.titulo,
      descripcion: this.eventoSeleccionado.descripcion || '',
      hora: this.eventoSeleccionado.hora || ''
    });
  
    const fechaPartes = this.eventoSeleccionado.fecha.split('T')[0].split('-');
    const year = parseInt(fechaPartes[0], 10);
    const month = parseInt(fechaPartes[1], 10) - 1;
    const day = parseInt(fechaPartes[2], 10);
  
    this.diaSeleccionado = new Date(year, month, day);
  
    this.idEventoEditando = this.eventoSeleccionado.id;
    this.modoEdicion = true;
  
    this.mostrarDetallesModal = false;
    this.mostrarCrearModal = true;
  }
  

  actualizarEvento() {
    if (this.eventForm.invalid || !this.idEventoEditando) return;
  
    const year = this.diaSeleccionado.getFullYear();
    const month = (this.diaSeleccionado.getMonth() + 1).toString().padStart(2, '0');
    const day = this.diaSeleccionado.getDate().toString().padStart(2, '0');
    const fecha = `${year}-${month}-${day}`;
  
    const eventoActualizado = {
      titulo: this.eventForm.value.titulo,
      fecha: fecha,
      descripcion: this.eventForm.value.descripcion || null,
      hora: this.eventForm.value.hora || null
    };
  
    this.eventoService.updateEvento(this.idEventoEditando, eventoActualizado).subscribe({
      next: () => {
        this.eventoService.listarEventos().subscribe({
          next: (res) => {
            this.eventos = res;
            console.log('Eventos actualizados:', res);
            this.alertService.alertaSuccess('Evento actualizado con éxito','');
          },
          error: (err) => {
            console.error('Error al cargar eventos:', err);
          }
        });

        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al actualizar evento:', err);
        this.alertService.alertaError('Error al actualizar evento','');
      }
    });
  }
  
  
  
  eliminarEvento() {
    if (!this.eventoSeleccionado) return;
  
    this.alertService.alertaConConfirmacion('¿Estás seguro de que deseas eliminar este evento?','').then((result) => {
      if (result.isConfirmed) {
      this.eventoService.deleteEvento(this.eventoSeleccionado.id).subscribe({
        next: () => {
          this.eventoService.listarEventos().subscribe({
            next: (res) => {
              this.eventos = res;
              console.log('Eventos actualizados:', res);

            },
            error: (err) => {
              console.error('Error al cargar eventos:', err);
            }
          });
          this.alertService.alertaSuccess('Evento eliminado con éxito','');
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al eliminar evento:', err);
          this.alertService.alertaError('Error al eliminar evento','');
        }
      });
    }
    }
  )}
  
}
