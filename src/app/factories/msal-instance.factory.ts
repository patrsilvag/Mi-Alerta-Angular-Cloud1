import { PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../../environments/environment';

export function MSALInstanceFactory(): PublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      authority: environment.authority,
      redirectUri: 'http://localhost:4200/',
      
    },
    cache: {
      cacheLocation: 'sessionStorage', // Esto es suficiente para evitar el bloqueo SameSite
    },
  });
}
