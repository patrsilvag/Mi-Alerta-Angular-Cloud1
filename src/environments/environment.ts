export const environment = {
  production: false,
  // Seguridad (IDaaS)
  clientId: 'ab3872f8-4702-4699-9862-aff3cbcc0b18',
  authority: 'https://login.microsoftonline.com/d7e7e206-ec2c-460a-a160-6f1cdd447720',
  // Microservicios (vía Gateway)

  // ✅ RUTAS RELATIVAS PARA EL PROXY
  apiAlertas: '/api/alertas',

  //apiProductos: 'http://mi-app-docker/api/productos',
  //apiPedidos: 'http://mi-app-docker/api/pedidos',
};
