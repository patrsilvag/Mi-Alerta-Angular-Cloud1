import { ApplicationConfig, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import {
  MsalModule,
  MsalService,
  MsalGuard,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';

import { IPublicClientApplication, InteractionType } from '@azure/msal-browser';

import { MSALInstanceFactory } from './factories/msal-instance.factory';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

// Inicialización MSAL
export function initializeMsal(msalInstance: IPublicClientApplication) {
  return () => msalInstance.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Router
    provideRouter(routes),

    // Http + interceptor
    provideHttpClient(withInterceptors([authInterceptor])),

    // MSAL module (necesario)
    importProvidersFrom(MsalModule),

    // MSAL instance
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },

    // MSAL guard config 
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: [
            'openid',
            'profile',
            'email',
            'https://duoc2026cn1grupo8.onmicrosoft.com/ab3872f8-4702-4699-9862-aff3cbcc0b18/access_as_user',
          ],
        },
      } as MsalGuardConfiguration,
    },

    // Inicializador MSAL
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMsal,
      multi: true,
      deps: [MSAL_INSTANCE],
    },

    // Servicios MSAL
    MsalService,
    MsalGuard,
  ],
};
