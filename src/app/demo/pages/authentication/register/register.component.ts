// angular import
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  constructor(private userService: UserService, private router: Router) { }

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
        alert('Usuario creado con exito!');
        this.router.navigate(['/guest/login']);
      },
      error: (err)=>{
        console.log(err);
        alert('Error al crear el usuario');
      }

    });
  
  }

}
