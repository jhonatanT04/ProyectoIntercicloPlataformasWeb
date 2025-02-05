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
    numberPhone: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/)]),
    addres: new FormControl('', [Validators.required]),
    codeZip: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordRepit: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, { validators: this.validationPassword('password', 'passwordRepit') })


  showDangerAlert = false;

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const persona = new Persona(
        0,
        this.form.get('email')?.value || '',
        this.form.get('password')?.value || '',
        this.form.get('name')?.value || '',
        this.form.get('lastName')?.value || '',
        this.form.get('numberPhone')?.value || '',
        this.form.get('addres')?.value || '',
        this.form.get('codeZip')?.value || '',
        false,  
        undefined  
      );
      this.servicioUser.createPersona(persona).subscribe({
        next: () => {
          this.loginService.regitrase(
            new User(this.form.get('email')?.value || '', this.form.get('password')?.value || ''))
            .then(() => {
              this.router.navigate(['pages/login']);
            })
            .catch((error) => {
              this.handleAuthError(error);
            });
        },
        error: () => {
          this.alertError("Error al registrar el usuario en la base de datos.");
        }
      });
    } else {
      this.alertError("Complete los campos correctamente.");
    }
  }




  onGoogle() {
    this.loginService.loginGoogle().then((response) => {
      if (response) {
        const isNewUser = response.isNewUser;
        
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

  handleAuthError(error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    switch (errorCode) {
      case 'auth/email-already-in-use':
        this.alertError("El correo ya está registrado.");
        break;
      case 'auth/invalid-email':
        this.alertError("Formato de correo inválido.");
        break;
      case 'auth/weak-password':
        this.alertError("La contraseña es demasiado débil.");
        break;
      case 'auth/operation-not-allowed':
        this.alertError("La creación de cuentas con correo y contraseña está deshabilitada.");
        break;
      case 'auth/too-many-requests':
        this.alertError("Demasiados intentos. Por favor, intenta más tarde.");
        break;
      case 'auth/popup-closed-by-user':
        this.alertError("Error al iniciar con Google.");
        break;
      default:
        this.alertError("Error desconocido: " + errorMessage);
    }
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
