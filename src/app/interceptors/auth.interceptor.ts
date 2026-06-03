import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { from, switchMap, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    
    console.log('INTERCEPTOR EJECUTADO');
    //console.log(req.url);
    
  const msalService = inject(MsalService);

  // CORRECCIÓN CLAVE: Fallback a getAllAccounts()[0] si getActiveAccount() es null
  const account =
    msalService.instance.getActiveAccount() || msalService.instance.getAllAccounts()[0];
//console.log('Cuenta encontrada:', account);
  if (!account) {
    console.warn('Interceptor: No hay cuenta activa ni guardada. Enviando petición sin token.');
    return next(req);
  }
//console.log('ANTES acquireTokenSilent');
  return from(
    msalService.instance.acquireTokenSilent({
      scopes: [
        'https://duoc2026cn1grupo8.onmicrosoft.com/ab3872f8-4702-4699-9862-aff3cbcc0b18/access_as_user',
      ],
      account: account,
    }),
  ).pipe(
    switchMap((tokenResponse) => {
        console.log('TOKEN OBTENIDO');
        console.log(tokenResponse);
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${tokenResponse.accessToken}` },
      });
      return next(authReq);
    }),
  );
};
