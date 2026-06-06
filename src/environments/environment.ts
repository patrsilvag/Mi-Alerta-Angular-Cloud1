export const environment = {
  production: false,
  // Seguridad (IDaaS)
  clientId: 'ab3872f8-4702-4699-9862-aff3cbcc0b18',
  authority: 'https://login.microsoftonline.com/d7e7e206-ec2c-460a-a160-6f1cdd447720',

  // Microservicios (vía API Gateway)
  // Reemplazamos la ruta local por la URL pública de AWS
  apiAlertas: 'https://7ls3ovjtn1.execute-api.us-east-1.amazonaws.com/api/alertas',
  
};
