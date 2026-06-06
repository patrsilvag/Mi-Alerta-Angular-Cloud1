import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertaVital } from '@models/alertas'; // Alias configurado en tsconfig.json
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpHeaders } from '@angular/common/http';

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

  actualizarEstado(id: number, nuevoEstado: string) {
    const url = `${this.apiUrl}/${id}/estado`;

    // 1. Angular necesita que el header sea explícito
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // 2. El cuerpo DEBE ser un objeto, no un string plano
    const body = { estado: nuevoEstado };

    console.log('Enviando PATCH a:', url, 'con body:', body);

    // 3. Pasamos el body y los headers
    return this.http.patch(url, body, { headers });
  }

  eliminarAlerta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  crearAlerta(nuevaAlerta: AlertaVital): Observable<AlertaVital> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AlertaVital>(`${this.apiUrl}`, nuevaAlerta, { headers });
  }
}
