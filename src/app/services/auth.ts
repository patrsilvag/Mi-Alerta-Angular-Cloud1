import { Injectable, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private msalService = inject(MsalService);

  login() {
    // Esto es void, no necesita .subscribe()
    this.msalService.loginRedirect({
      scopes: ['openid', 'profile'],
      prompt: 'select_account',
    });
  }

  // Método para verificar si el usuario ya está logueado
  isLoggedIn(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }
}