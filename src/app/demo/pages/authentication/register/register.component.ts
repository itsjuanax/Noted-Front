// angular import
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  constructor(private userService: UserService, private router: Router, private alertService: AlertService) { }

  registerForm = new FormGroup({
    nombreCompleto: new FormControl('', [Validators.required]),
    nombreUsuario: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f(){
    return this.registerForm.controls;
  }

  addUser(){
    if(this.registerForm.invalid) return;

    const user: User = {
      nombreCompleto: this.registerForm.value.nombreCompleto,
      nombreUsuario: this.registerForm.value.nombreUsuario,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      estado: 'Activo'
    };


    this.userService.addUser(user).subscribe({
      next: (res)=>{
        console.log(res);
        console.log(res.id)
        this.alertService.alertaSuccess('Usuario creado con éxito', 'Ya puedes iniciar sesión');
        this.router.navigate(['/guest/login']);
      },
      error: (err)=>{
        console.log(err);
        this.alertService.alertaError('Error al crear el usuario', 'Asegurate de que todos los campos sean correctos');
      }

    });
  
  }

}
