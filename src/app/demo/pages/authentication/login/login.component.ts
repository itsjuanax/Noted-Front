// angular import
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {

  constructor(private userService: UserService,private authService: AuthService, private router: Router, private alertService: AlertService) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) return;

    const{ email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (res) => {
        localStorage.setItem('AuthToken', res.token);
        const userId = this.authService.getUserIdFromToken();
        if(userId) {
          this.userService.getUserById(userId).subscribe({
            next: (usuario) => {
              if(usuario.estado !== 'Activo') {
                this.alertService.alertaError('Cuenta desactivada', 'Ya no puedes ingresar porque desactivaste tu cuenta.');
                localStorage.removeItem('AuthToken');
              }else{
                this.router.navigate(['/default']);
              }
            },
            error: (err) => {
              console.error('Error al cargar nombre de usuario:', err);
            }
          });

        }
        
      },
      error: (err) => {
        console.log(err);
        this.alertService.alertaError('Error al iniciar sesión', 'Verifica tu correo o contraseña');
      },
    });
  }
}
