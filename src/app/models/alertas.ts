export interface AlertaVital {
  id?: number;
  fecha: string;
  hora: string;
  colorAlerta: 'ROJO' | 'AMARILLO' | 'VERDE';
  nombrePaciente: string;
  habitacion: string;
  signosVitales: string; // El resumen de 1000 caracteres
}
