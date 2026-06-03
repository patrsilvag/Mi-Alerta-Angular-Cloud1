import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaVital } from '../../models/alertas'; // Modelo correcto
import { AlertasService } from '../../services/alertas'; // Servicio correcto

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertas.html',
  styleUrls: ['./alertas.scss'],
})
export class AlertasComponent implements OnInit {
  alertas: AlertaVital[] = [];
  alertaSeleccionada: AlertaVital | null = null;

  constructor(
    private readonly alertasService: AlertasService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.alertasService.listarAlertas().subscribe({
      next: (datos: any) => {
        // Adaptamos los datos recibidos (asegurando el formato array)
        this.alertas = Array.isArray(datos) ? datos : datos.content || [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar alertas:', err),
    });
  }

  verDetalles(alerta: AlertaVital) {
    this.alertaSeleccionada = alerta;
  }
}
