import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import {FormGroup,FormControl, Validators, ReactiveFormsModule} from '@angular/forms'
import { User } from '../../models/user';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import { error } from 'node:console';
// Matbu
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  constructor(private loginService:AuthentificServiceService){}
  router=inject(Router)

  form = new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })
  onSubmit(){
    if(this.form.valid){
      this.loginService.regitrase(this.form.value as User)
      .then(resr =>{
        this.router.navigate(['pages/login'])
      }).catch(error=>console.log(error))
      
    }
  }
  onGoogle(){
    this.loginService.loginGoogle().then(resr =>{
      this.router.navigate(['pages/login'])
    }).catch(error=>console.log(error))
  }
}
