import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { UsuariosServiceService } from '../../services/usuarios-service.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{
  nombre=''
  apellido=''
  correo:string | null =null
  constructor(private correoS:AuthentificServiceService,private userS:UsuariosServiceService){}
  ngOnInit(): void {
    this.correo = this.correoS.getUserEmail()
    this.nombre = this.userS.buscarUsuarioPorEmail(this.correo)?.nombre || ''
    this.apellido = this.userS.buscarUsuarioPorEmail(this.correo)?.apellido || ''
  }
}
