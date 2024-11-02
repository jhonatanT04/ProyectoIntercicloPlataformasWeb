import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import {FormGroup,FormControl, Validators, ReactiveFormsModule} from '@angular/forms'
import { User } from '../../models/user';
import { AdministradoresServiceService } from '../../services/administradores-service.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
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
  onSubmit() {
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
        .catch(error => console.log(error));
    }
  }
  onGoogle(){
    this.loginService.loginGoogle().then(resr =>{
      this.router.navigate(['/pages/administrador'])
    }).catch(error=>console.log(error))
  }
  visible:boolean = true;
  changetype:boolean =true;
  
  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
    
  }
}
