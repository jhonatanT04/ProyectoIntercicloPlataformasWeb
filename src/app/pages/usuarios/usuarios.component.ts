import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Persona } from '../../models/persona';
import { error } from 'node:console';



@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
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
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordRepit: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, { validators: this.validationPassword('password', 'passwordRepit') })


  showDangerAlert = false;

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const per = new Persona(
        this.form.get('email')?.value || ' ',
        this.form.get('password')?.value || ' ',
        this.form.get('name')?.value || ' ',
        this.form.get('lastName')?.value || ' ',
        this.form.get('numberPhone')?.value || ' ',
        this.form.get('addres')?.value || ' ',
        this.form.get('codeZip')?.value || ' ',
        this.form.get('country')?.value || ' ',
        this.form.get('city')?.value || ' '
      );
      this.servicioUser.nuevoUsuario(per)
      this.loginService.regitrase(new User(this.form.get('email')?.value || ' ', this.form.get('password')?.value || 'ania'))
        .then(resr => {
          this.router.navigate(['pages/login'])
        }).catch((error) => {

          const errorCode = error.code;
          const errorMessage = error.message;

          switch (errorCode) {
            case 'auth/email-already-in-use':
              this.alertError("El correo ya está registrado.")
              break;
            case 'auth/invalid-email':
              this.alertError("Formato de correo inválido.")
              break;
            case 'auth/weak-password':
              this.alertError(" La contraseña es demasiado débil.")
              break;
            case 'auth/operation-not-allowed':
              this.alertError("La creación de cuentas con correo y contraseña está deshabilitada.")
              break;
            case 'auth/too-many-requests':
              this.alertError("Demasiados intentos. Por favor, intenta más tarde.")
              break;
            default:
              this.alertError("Error desconocido:" + errorMessage)
          }
        });
    } else {
      this.alertError("Complete los campos.")
    }
  }
  onGoogle() {
    this.loginService.loginGoogle().then((response) => {
      if (response) {
        const isNewUser = response.isNewUser;
        const user = response.usuarioAdmin
        console.log('New User :', isNewUser);
        if (isNewUser) {
          this.router.navigate(['components/registro-google']);
        } else {
          this.alertWarning('Ya existe un usuario asociado con este correo electronico')
        }
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/popup-closed-by-user':
          this.alertError("Error al iniciar con google.")
          break;
        default:
          this.alertError("Error desconocido:" + errorMessage)
      }
    });
  }

  validationPassword(field1: string, field2: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : { fieldsMismatch: true };
    };
  }

  textError = ''
  alertError(error: string) {
    setTimeout(() => {
      this.textError = error
      this.showDangerAlert = true;
    }, 4);
    this.textError = ''
    this.showDangerAlert = false;
  }

  textAlert = ''
  showWarningAlert = false
  alertWarning(error:string) {
    setTimeout(() => {
      this.textAlert = error
      this.showWarningAlert = true;
    }, 4);
    this.textAlert = ''
    this.showWarningAlert = false;
  }
}
