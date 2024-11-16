import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import {FormGroup,FormControl, Validators, ReactiveFormsModule} from '@angular/forms'
import { User } from '../../models/user';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(private loginService:AuthentificServiceService, private admin:AdministradoresServiceService){}
  router=inject(Router)

  form = new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
    this.admin.cargarAdmi() 
  }
  iniciarSecion() {
    if (this.form.valid) {
      const usuario = this.form.value as User;
      
      this.loginService.login(usuario)
        .then(persona => {
          if (persona?.rolAdministrativo) {
            this.router.navigate(['/pages/administrador']);  
          } else {
            this.router.navigate(['/pages/perfil']);       
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          switch (errorCode) {
              case "auth/user-not-found":
                this.alertError("No existe una cuenta con este correo.");
                  break;
              case "auth/wrong-password":
                this.alertError("Contraseña incorrecta.");
                  break;
              case "auth/invalid-email":
                this.alertError("Correo electrónico inválido.");
                  break;
              case "auth/invalid-login-credentials":
                  this.alertError("Correo electrónico o contraseña inválido.");
                  break
              case "auth/user-disabled":
                this.alertError("La cuenta ha sido deshabilitada.");
                  break;
              case "auth/too-many-requests":
                this.alertError("Demasiados intentos. Intente de nuevo en unos minutos.");
                  break;
              case "auth/network-request-failed":
                this.alertError("Error de red. Verifique su conexión.");
                  break;
              case "auth/operation-not-allowed":
                this.alertError("Inicio de sesión con correo electrónico no habilitado.");
                  break;
              default:
                this.alertError("Error desconocido: " + errorMessage);
          }
      });
    }else{
      this.alertError("Complete los campos.")
    }
  }
  onGoogle(){
    this.loginService.loginGoogle().then(resr =>{
      const newUser = resr.isNewUser
      const persona = resr.usuarioAdmin
      if(newUser){
        this.router.navigate(['components/registro-google']);
      }else{
        if(persona?.rolAdministrativo===true){
          this.router.navigate(['/pages/administrador'])
        }else{
          this.router.navigate(['/pages/perfil'])
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
  visible:boolean = true;
  changetype:boolean =true;
  
  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  showDangerAlert = false;
  textError = ''
  alertError(error: string) {
    setTimeout(() => {
      this.textError = error
      this.showDangerAlert = true;
    }, 4);
    this.textError = ''
    this.showDangerAlert = false;
  }
}
