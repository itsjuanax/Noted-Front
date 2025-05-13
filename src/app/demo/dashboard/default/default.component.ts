import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  fraseDelDia = '';

  frases = [
    "Hoy es una nueva oportunidad.",
    "Confía en tu proceso.",
    "Cada pequeño paso cuenta.",
    "Celebra tus avances.",
    "Tú puedes lograrlo.",
    "Sigue creyendo en ti."
  ];

  ngOnInit(): void {
    this.fraseDelDia = this.frases[Math.floor(Math.random() * this.frases.length)];
  }
}
