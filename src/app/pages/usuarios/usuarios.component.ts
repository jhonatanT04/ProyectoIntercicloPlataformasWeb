import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { User } from '../../models/user';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Persona } from '../../models/persona';

// Matbu
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  constructor(private loginService: AuthentificServiceService) { }
  router = inject(Router)
  servicioUser = inject(UsuariosServiceService)
  
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required]),
    numberPhone: new FormControl('', [Validators.required]),
    addres: new FormControl('', [Validators.required]),
    codeZip: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    passwordRepit: new FormControl('',[Validators.required,Validators.minLength(8)])
  },{validators:this.validationPassword('password','passwordRepit')})
  
  

  onSubmit() {
    this.form.markAllAsTouched();
    
    if (this.form.valid) {
      
      const per = new Persona(
        this.form.get('email')?.value||' ',
        this.form.get('password')?.value||' ',
        this.form.get('name')?.value ||' ',
        this.form.get('lastName')?.value ||' ',
        this.form.get('numberPhone')?.value ||' ',
        this.form.get('addres')?.value ||' ',
        this.form.get('codeZip')?.value ||' ',
        this.form.get('country')?.value ||' ',
        this.form.get('city')?.value ||' '
    );
      
      this.servicioUser.nuevoUsuario(per)
      this.loginService.regitrase(new User(this.form.get('email')?.value||' ',this.form.get('password')?.value||'ania'))
        .then(resr => {
          this.router.navigate(['pages/login'])
        }).catch(error => console.log(error))

    }
  }
  onGoogle() {
    
    if (this.form.valid) {
      this.loginService.loginGoogle().then(resr => {
        this.router.navigate(['pages/login'])
      }).catch(error => console.log(error))
    }
  }

  validationPassword(field1: string, field2: string):ValidatorFn{
    
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : { fieldsMismatch: true };
    };
  }
}
