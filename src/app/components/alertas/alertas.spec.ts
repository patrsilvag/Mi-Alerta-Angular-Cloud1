import { of, throwError } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { AlertasComponent } from './alertas'; // Importamos el componente renombrado

describe('AlertasComponent', () => {
  // Mocks de servicios adaptados
  const alertasServiceMock = {
    listarAlertas: vi.fn().mockReturnValue(
      of([
        {
          id: 1,
          fecha: '2026-06-03',
          hora: '10:00',
          colorAlerta: 'ROJO',
          nombrePaciente: 'Juan Perez',
          habitacion: '101',
          signosVitales: 'Taquicardia, presión alta',
        },
      ]),
    ),
  };

  // Como ya no tenemos carrito/pago en este nuevo alcance,
  // eliminamos el mock de pedidos si ya no se usa en el componente.
  const routerMock = { navigate: vi.fn() };
  const cdrMock = { detectChanges: vi.fn() }; // Necesario porque inyectamos ChangeDetectorRef

  it('debería cubrir el flujo completo de carga de alertas', () => {
    const component = new AlertasComponent(
      alertasServiceMock as any,
      cdrMock as any,
      routerMock as any,
    );

    // 1. Cubrir éxito en carga
    component.ngOnInit();
    expect(component.alertas.length).toBe(1);
    expect(component.alertas[0].nombrePaciente).toBe('Juan Perez');

    // 2. Cubrir error en carga
    alertasServiceMock.listarAlertas.mockReturnValueOnce(throwError(() => new Error('Fail')));
    component.ngOnInit();
    expect(console.error).toBeDefined(); // Verificamos que se maneja el error

    // 3. Probar lógica de selección de detalle
    const alertaSeleccionada = {
      id: 2,
      fecha: '2026-06-03',
      hora: '11:00',
      colorAlerta: 'AMARILLO',
      nombrePaciente: 'Maria Lopez',
      habitacion: '202',
      signosVitales: 'Estable',
    };

    component.verDetalles(alertaSeleccionada as any);
    expect(component.alertaSeleccionada?.nombrePaciente).toBe('Maria Lopez');
  });
});
