export const environment = {
  production: false,
  //apiUsuarios: 'http://mi-app-docker/api/usuarios', // <-- Revisa que no diga localhost
  //apiProductos: 'http://mi-app-docker/api/productos',
  //apiPedidos: 'http://mi-app-docker/api/pedidos',

  // ✅ RUTAS RELATIVAS PARA EL PROXY
  apiUsuarios: '/api/usuarios',
  apiProductos: '/api/productos',
  apiPedidos: '/api/pedidos',
};
