import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import {FormGroup,FormControl, Validators, ReactiveFormsModule} from '@angular/forms'
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private loginService:AuthentificServiceService){}
  router=inject(Router)

  form = new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })
  onSubmit(){
    if(this.form.valid){
      
      this.loginService.login(this.form.value as User)
      .then(resr =>{
        this.router.navigate(['/pages/administrador'])
      }).catch(error=>console.log(error))
      
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
