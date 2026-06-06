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
    this.cargarAlertas();
  }

  cargarAlertas() {
    this.alertasService.listarAlertas().subscribe({
      next: (datos: any) => {
        console.log('Datos recibidos de Oracle:', datos); 
        // 1. Obtenemos el array base
        const rawData = Array.isArray(datos) ? datos : datos.content || [];

        // 2. Transformamos los datos para asegurar que el estado sea limpio
        this.alertas = rawData.map((item: any) => ({
          ...item,
          // .trim() elimina espacios ocultos y aseguramos que coincida con tus opciones
          estado: item.estado ? item.estado.trim() : 'Pendiente',
        }));

        // 3. Forzamos el repintado
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

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      this.alertasService.eliminarAlerta(id).subscribe({
        next: () => {
          this.cargarAlertas(); // Al recargar, el registro eliminado simplemente desaparecerá
        },
        error: (err: any) => console.error('Error al eliminar', err),
      });
    }
  }

  guardar() {
    if (!this.nuevaAlerta.nombrePaciente || !this.nuevaAlerta.habitacion) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    this.alertasService.crearAlerta(this.nuevaAlerta).subscribe({
      next: () => {
        this.limpiarFormulario();
        this.cargarAlertas(); // Al recargar, el nuevo registro aparecerá mágicamente
        alert('Alerta registrada con éxito');
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('No se pudo guardar la alerta.');
      },
    });
  }

  limpiarFormulario() {
    // Reasignamos el objeto a una nueva instancia limpia
    this.nuevaAlerta = {
      nombrePaciente: '',
      habitacion: '',
      colorAlerta: 'VERDE',
      signosVitales: '',
      fechaHora: new Date().toISOString(),
      hora: new Date().toLocaleTimeString(),
      estado: 'Pendiente',
    };
  }

  nuevaAlerta: AlertaVital = {
    nombrePaciente: '',
    habitacion: '',
    colorAlerta: 'VERDE',
    signosVitales: '',
    // Convierte la fecha actual a formato string (ej: "2026-06-05T23:50:00.000Z")
    fechaHora: new Date().toISOString(),
    hora: new Date().toLocaleTimeString(),
    estado: 'Pendiente', // El valor por defecto
  };
}
