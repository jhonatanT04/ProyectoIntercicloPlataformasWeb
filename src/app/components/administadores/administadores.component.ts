import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';



@Component({
  selector: 'app-administadores',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './administadores.component.html',
  styleUrl: './administadores.component.scss'
})
export class AdministadoresComponent {
  authServicio = inject(AuthentificServiceService)
  router = inject(Router)
  cerrarSeccion(){
    
    this.authServicio.logout().then(()=>
    this.router.navigate(['pages/login']))
    .catch(error => console.log(error))
  }
}
