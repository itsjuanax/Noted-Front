import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  nombreCompleto: string = '';
  nombreUsuario: string = '';
  emailUsuario: string = '';
  userId: string = '';

  modoEdicion: boolean = false; // Para saber si estamos en edición

  perfilForm: FormGroup = new FormGroup({
    nombreCompleto: new FormControl('', [Validators.required]),
    nombreUsuario: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken() || '';

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (usuario) => {
          this.nombreCompleto = usuario.nombreCompleto || 'Nombre Completo';
          this.nombreUsuario = usuario.nombreUsuario || 'NombreUsuario';
          this.emailUsuario = usuario.email || 'correo@ejemplo.com';

          this.perfilForm.patchValue({
            nombreCompleto: this.nombreCompleto,
            nombreUsuario: this.nombreUsuario,
            email: this.emailUsuario
          });
        },
        error: (err) => {
          console.error('Error al obtener el perfil:', err);
          this.alertService.alertaError('Error al cargar el perfil', '');
        }
      });
    }
  }

  editarPerfil() {
    this.modoEdicion = true;

    this.perfilForm.patchValue({
      nombreCompleto: this.nombreCompleto,
      nombreUsuario: this.nombreUsuario,
      email: this.emailUsuario
    });
  }

  guardarCambios() {
    if (this.perfilForm.invalid) return;

    const datosActualizados = {
      nombreCompleto: this.perfilForm.value.nombreCompleto,
      nombreUsuario: this.perfilForm.value.nombreUsuario,
      email: this.perfilForm.value.email
    };

    this.userService.updateUsuario(this.userId, datosActualizados).subscribe({
      next: (res: any) => {
        this.alertService.alertaSuccess('Perfil actualizado', 'Los cambios se han guardado correctamente.');
        this.nombreCompleto = res.usuario.nombreCompleto;
        this.nombreUsuario = res.usuario.nombreUsuario;
        this.emailUsuario = res.usuario.email;
        this.modoEdicion = false;
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
        this.alertService.alertaError('Error al actualizar perfil', 'Asegúrate de que todos los campos sean correctos.');
      }
    });
  }

  cancelarEdicion() {
    this.modoEdicion = false;

    this.perfilForm.patchValue({
      nombreCompleto: this.nombreCompleto,
      nombreUsuario: this.nombreUsuario,
      email: this.emailUsuario
    });
  }

  cambiandoPassword: boolean = false;

  cambioPasswordForm: FormGroup = new FormGroup({
    passwordActual: new FormControl('', [Validators.required]),
    passwordNueva: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmarPassword: new FormControl('', [Validators.required]),
  });


  abrirCambioPassword() {
    this.cambiandoPassword = true;
    this.cambioPasswordForm.reset();
  }


  guardarNuevaPassword() {
    if (this.cambioPasswordForm.invalid) return;

    const { passwordActual, passwordNueva, confirmarPassword } = this.cambioPasswordForm.value;

    if (passwordNueva !== confirmarPassword) {
      this.alertService.alertaError('Las nuevas contraseñas no coinciden', '');
      return;
    }

    if (passwordActual === passwordNueva) {
      this.alertService.alertaError('La nueva contraseña no puede ser igual a la actual', '');
      return;
    }


    this.userService.updateUsuario(this.userId, { password: passwordNueva }).subscribe({
      next: () => {
        this.alertService.alertaSuccess('Contraseña actualizada', 'Tu contraseña ha sido actualizada correctamente.');
        this.cambiandoPassword = false;
        this.cambioPasswordForm.reset();
      },
      error: (err) => {
        console.error('Error al actualizar contraseña:', err);
        this.alertService.alertaError('Error al actualizar contraseña', '');
      }
    });
  }


  cancelarCambioPassword() {
    this.cambiandoPassword = false;
    this.cambioPasswordForm.reset();
  }


  eliminarCuenta() {
    this.alertService.alertaConConfirmacion('¿Estás seguro de que quieres eliminar tu cuenta?', 'Esta acción es irreversible.').then((result) => {
      if (result.isConfirmed) {
        this.userService.changeUserStatus(this.userId, 'Inactivo').subscribe({
          next: () => {
            alert('Cuenta eliminada correctamente.');
            localStorage.removeItem('AuthToken');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Error al eliminar cuenta:', err);
            alert('Error al eliminar cuenta');
          }
        });
      }
    });
  }
}
