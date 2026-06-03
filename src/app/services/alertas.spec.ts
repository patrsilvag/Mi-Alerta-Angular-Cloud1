import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { environment } from '../../environments/environment'; // ✅ Importamos el environment
import { Producto } from '../models/alertas';
import { Productos } from './alertas'; // ✅ Corregido: Importa desde tu archivo original

describe('ProductosService (Unit Test)', () => {
  let service: Productos;
  let httpMock: any;

  beforeEach(() => {
    // Inicializamos el mock antes de cada test para evitar duplicidad de código
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
    };
    service = new Productos(httpMock as any);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería ejecutar listarProductos() mediante GET', () => {
    const productosMock: Producto[] = [
      {
        id: 1,
        nombre: 'Producto A',
        descripcion: 'Descripción A',
        precio: 15000,
        stock: 10,
      } as Producto,
    ];

    // Configuramos el mock para devolver el observable con los datos
    httpMock.get.mockReturnValue(of(productosMock));

    service.listarProductos().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res).toEqual(productosMock);
    });

    // ✅ CORRECCIÓN DINÁMICA: Ya no usamos localhost en duro
    expect(httpMock.get).toHaveBeenCalledWith(environment.apiProductos);
  });
});
