import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Persona } from '../../models/persona';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit{
  clientes: Persona[] = []
  nombre=''
  correo=''
  telefono=''
  clienteSeleccionado: Persona | null = null

  ngOnInit(): void {
    this.cargarClientes() 
  }
  constructor(private clienteS:UsuariosServiceService){}

  cargarClientes(){
    this.clientes = this.clienteS.cargarUsuario() 
  }

  guardarCliente(){

  }

  eliminarCliente(cliente:any){

  }

  editarCliente(cliente: Persona) {
    this.clienteSeleccionado = { ...cliente }; 
  }
  actualizarCliente(){
    this.clienteS.buscarUsuarioPorEmail(this.correo)

    //this.clienteS.actualizarUsuario(this.correo);
  }
}
