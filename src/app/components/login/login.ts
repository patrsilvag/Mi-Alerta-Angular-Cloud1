import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 1. Importa Router
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [], // Ya no necesitas ReactiveFormsModule
  templateUrl: './login.html',
})
export class LoginComponent {
  // 2. Inyecta el router en el constructor
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    // 3. Asegúrate de que login() retorne un observable (ej. return this.http.post(...))
    this.authService.login();
   }
}