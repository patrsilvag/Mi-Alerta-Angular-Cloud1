
import { Component, inject } from '@angular/core'; 
import { Router, RouterModule } from '@angular/router';
import { MsalService } from '@azure/msal-angular';   // Importamos el servicio de MSAL

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private msalService = inject(MsalService);

  // Verifica si hay al menos una cuenta activa
  isLoggedIn(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  // Si necesitas verificar roles, Azure los envía en los claims del token
  esAdmin(): boolean {
    const account = this.msalService.instance.getActiveAccount();
    // Ejemplo: Verifica si el nombre o correo del claim contiene 'admin'
    return account?.username.includes('admin') ?? false;
  }

  cerrarSesion() {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: window.location.origin + '/login',
    });
  }

  registrarUsuario() {
    // Todo el objeto de configuración va dentro de los paréntesis
    this.msalService.loginRedirect({
      scopes: ['openid', 'profile'],
      prompt: 'create',
    });
  }
}