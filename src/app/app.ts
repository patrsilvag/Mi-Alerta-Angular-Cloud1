import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer';
import { HeaderComponent } from './components/header/header';

// Importaciones de MSAL
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // PROCESAR REDIRECT DE AZURE
    this.msalService.handleRedirectObservable().subscribe({
      next: (result) => {
        console.log('Resultado redirect:', result);

        if (result) {
          const accounts = this.msalService.instance.getAllAccounts();

          console.log('Cuentas encontradas:', accounts);

          if (accounts.length > 0) {
            this.msalService.instance.setActiveAccount(accounts[0]);

            console.log('Cuenta activa configurada');
          }

          console.log('Redirigiendo a productos...');

          this.router.navigate(['/alertas']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });

    // EVENTO LOGIN EXITOSO
    this.msalBroadcastService.msalSubject$
      .pipe(filter((msg) => msg.eventType === EventType.LOGIN_SUCCESS))
      .subscribe(() => {
        console.log('Login exitoso, redirigiendo...');
        this.router.navigate(['/productos']);
      });

    // SESIÓN ACTIVA
    if (this.msalService.instance.getAllAccounts().length > 0) {
      console.log('Sesión activa detectada');
      this.router.navigate(['/productos']);
    }
  }
}
