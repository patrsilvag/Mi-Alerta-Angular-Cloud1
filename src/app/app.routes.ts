import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import { AlertasComponent } from './components/alertas/alertas';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'alertas',
    component: AlertasComponent,
    canActivate: [MsalGuard],
  },

  { path: '**', redirectTo: 'login' },
];
