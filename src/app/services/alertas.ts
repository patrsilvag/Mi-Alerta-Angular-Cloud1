import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertaVital } from '@models/alertas'; // Alias configurado en tsconfig.json
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  // La URL apunta ahora al endpoint de alertas configurado en environment.ts
  private readonly apiUrl = environment.apiAlertas;

  constructor(private readonly http: HttpClient) {}

  // Consulta el registro de alertas de pacientes críticos en Oracle
  listarAlertas(): Observable<AlertaVital[]> {
    console.log('URL de alertas usada:', this.apiUrl);
    return this.http.get<AlertaVital[]>(this.apiUrl);
  }

  // Permite actualizar el estado o resumen de una alerta médica
  actualizarAlerta(id: number, alerta: AlertaVital): Observable<AlertaVital> {
    // Mantenemos la lógica de validación por rol si es necesaria para la seguridad
    return this.http.put<AlertaVital>(`${this.apiUrl}/${id}?rol=ADMIN`, alerta);
  }
}
