// Angular import
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// third party import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthService } from 'src/app/services/auth/auth.service'; // 👈 Importar AuthService
import { UserService } from 'src/app/services/user/user.service'; // 👈 Importar UserService

@Component({
  selector: 'app-nav-right',
  imports: [RouterModule, SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  nombreUsuario: string = 'Invitado';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserIdFromToken();

    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (usuario) => {
          this.nombreUsuario = usuario.nombreUsuario || 'Invitado';
        },
        error: (err) => {
          console.error('Error al cargar nombre de usuario:', err);
        }
      });
    }
  }
}
