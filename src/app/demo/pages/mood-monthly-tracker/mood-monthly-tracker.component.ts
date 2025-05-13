import { Component, OnInit } from '@angular/core';
import { MoodMonthlyService } from 'src/app/services/moodMonthly/mood-monthly.service';
import { MoodMonthly } from 'src/app/models/moodMonthly';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
    selector: 'app-mood-monthly',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mood-monthly-tracker.component.html',
    styleUrls: ['./mood-monthly-tracker.component.scss']
})
export class MoodMonthlyTrackerComponent implements OnInit {
    year = new Date().getFullYear();
    month = new Date().getMonth();
    calendario: (Date | null)[][] = [];
    moodsMap: { [fecha: string]: { id?: string; mood: string } } = {};

    diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    emociones = [
        { nombre: 'enojo', color: '#ff6b6b' },
        { nombre: 'miedo', color: '#a29bfe' },
        { nombre: 'alegria', color: '#ffeaa7' },
        { nombre: 'tristeza', color: '#74b9ff' },
        { nombre: 'culpa', color: '#a1866f' },
        { nombre: 'desesperanza', color: '#b2bec3' },
        { nombre: 'frustracion', color: '#55efc4' },
        { nombre: 'otras', color: '#fab1a0' }
    ];


    emocionSeleccionada: string | null = null;

    constructor(private service: MoodMonthlyService, private alertService: AlertService) { }

    ngOnInit(): void {
        this.generarCalendario();
        this.cargarDatos();
    }

    generarCalendario(): void {
        const primerDia = new Date(this.year, this.month, 1);
        const primerDiaSemana = (primerDia.getDay() + 6) % 7; // Lunes = 0
        const diasEnMes = new Date(this.year, this.month + 1, 0).getDate();

        const celdas: (Date | null)[] = Array(primerDiaSemana).fill(null);
        for (let d = 1; d <= diasEnMes; d++) {
            celdas.push(new Date(this.year, this.month, d));
        }
        while (celdas.length % 7 !== 0) {
            celdas.push(null);
        }

        this.calendario = [];
        for (let i = 0; i < celdas.length; i += 7) {
            this.calendario.push(celdas.slice(i, i + 7));
        }
    }

    cargarDatos(): void {
        this.service.getMoodsMonthly().subscribe({
            next: moods => {
                this.moodsMap = {};
                moods.forEach(m => {
                    const fechaStr = m.fecha.split('T')[0];
                    const fecha = new Date(fechaStr);
                    if (fecha.getFullYear() === this.year && fecha.getMonth() === this.month) {
                        this.moodsMap[fechaStr] = { id: m.id, mood: m.mood };
                    }
                });
            },
            error: () => alert('Error al cargar moods mensuales.')
        });
    }

    seleccionarEmocion(nombre: string): void {
        this.emocionSeleccionada = nombre;
    }

    pintar(fecha: Date): void {
        if (this.emocionSeleccionada === null) return;
        const fechaStr = fecha.toISOString().split('T')[0];
        const registro = this.moodsMap[fechaStr];

        if (registro) {
            this.service.updateMoodMonthly(registro.id!, { mood: this.emocionSeleccionada }).subscribe({
                next: () => {
                    this.moodsMap[fechaStr].mood = this.emocionSeleccionada!;
                    this.cargarDatos();
                },
                error: () => this.alertService.alertaError('Error','Error al actualizar emoción.')
            });
        } else {
            const nuevo: MoodMonthly = { fecha: fechaStr, mood: this.emocionSeleccionada };
            this.service.addMoodMonthly(nuevo).subscribe({
                next: creado => {
                    this.moodsMap[fechaStr] = { id: creado.id!, mood: this.emocionSeleccionada! };
                    this.cargarDatos();
                },
                error: () => this.alertService.alertaError('Error','Error al guardar emoción.')
            });
        }
    }


    getColor(fecha: Date | null): string {
        if (!fecha) return 'white';
        const mood = this.moodsMap[fecha.toISOString().split('T')[0]];
        const emocion = this.emociones.find(e => e.nombre === mood?.mood);
        return emocion ? emocion.color : 'white';
    }

    mesAnterior(): void {
        if (this.month === 0) {
            this.month = 11;
            this.year--;
        } else {
            this.month--;
        }
        this.generarCalendario();
        this.cargarDatos();
    }

    mesSiguiente(): void {
        if (this.month === 11) {
            this.month = 0;
            this.year++;
        } else {
            this.month++;
        }
        this.generarCalendario();
        this.cargarDatos();
    }

    nombreMes(): string {
        return new Date(this.year, this.month).toLocaleString('default', { month: 'long' });
    }
}