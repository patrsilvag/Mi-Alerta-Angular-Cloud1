export interface AlertaVital {
  id?: number;
  fechaHora: string; // <-- Asegúrate de que este nombre coincida con el HTML
  hora: string;
  colorAlerta: 'ROJO' | 'AMARILLO' | 'VERDE';
  nombrePaciente: string;
  habitacion: string;
  signosVitales: string; // El resumen de 1000 caracteres
}
