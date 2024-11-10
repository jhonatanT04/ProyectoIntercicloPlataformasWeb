import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { TarifasComponent } from '../../pages/tarifas/tarifas.component';
import { HorariosComponent } from '../../pages/horarios/horarios.component';
import { ContratosComponent } from '../../pages/contratos/contratos.component';
import { ListaUsuariosComponent } from '../../pages/lista-usuarios/lista-usuarios.component';
import { GestionEspaciosComponent } from '../../pages/gestion-espacios/gestion-espacios.component';
import { CommonModule } from '@angular/common';
import { AdministradoresServiceService } from '../../services/administradores-service.service';

@Component({
  selector: 'app-administadores',
  standalone: true,
  imports: [RouterModule,TarifasComponent,HorariosComponent,ContratosComponent,ListaUsuariosComponent,GestionEspaciosComponent,CommonModule],
  templateUrl: './administadores.component.html',
  styleUrl: './administadores.component.scss'
})
export class AdministadoresComponent implements OnInit{
  authServicio = inject(AuthentificServiceService)
  router = inject(Router)
  isSize = false
  cerrarSeccion(){
    
    this.authServicio.logout().then(()=>
    this.router.navigate(['pages/login']))
    .catch(error => console.log(error))
  }
  agrandar(){
    this.isSize = !this.isSize;
  }
  user=''
  email=''
  espacios: boolean = false
  contratos: boolean = false
  tarifas: boolean = false
  horarios: boolean = false
  clientes: boolean = false

  seccionabierta: string = ''; 
  constructor(private loginS:AuthentificServiceService,private adminS:AdministradoresServiceService){}
  ngOnInit(): void {
    this.email=this.loginS.getUserEmail()
    this.user=this.adminS.buscarAdminPorEmail(this.email)?.nombre || ''
  }
  abrirSeccion(seccion: string) {
    this.seccionabierta = this.seccionabierta === seccion ? '' : seccion; 
  }

  seccionAbierta(seccion: string): boolean {
    return this.seccionabierta === seccion;
  }
}
