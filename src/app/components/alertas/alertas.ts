import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 1. Importar FormsModule
import { Router } from '@angular/router';
import { AlertaVital } from '../../models/alertas';
import { AlertasService } from '../../services/alertas';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, FormsModule], // 2. Añadir FormsModule a los imports
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
        this.alertas = Array.isArray(datos) ? datos : datos.content || [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar alertas:', err),
    });
  }

  verDetalles(alerta: AlertaVital) {
    this.alertaSeleccionada = alerta;
  }

  // 3. Nueva función para actualizar el estado
  cambiarEstado(alerta: AlertaVital) {
    if (!alerta.id) return;

    // Llamamos al servicio (asegúrate de tener este método implementado en AlertasService)
    this.alertasService.actualizarEstado(alerta.id, alerta.estado).subscribe({
      next: () => {
        console.log(`Estado del paciente ${alerta.nombrePaciente} actualizado a: ${alerta.estado}`);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al actualizar el estado:', err);
        // Opcional: revertir el estado en el front si falla la petición
      },
    });
  }
}
