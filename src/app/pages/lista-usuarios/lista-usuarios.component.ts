import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Persona } from '../../models/persona';
import { AdministradoresServiceService } from '../../services/administradores-service.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit{
  clientes: Persona[] = []
  nombre=''
  apellido = ''
  correo=''
  numeroTelefonico=''
  clienteSeleccionado = false

  editarForm = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    numeroTelefonico: new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
    this.cargarClientes() 
  }
  constructor(private clienteS:UsuariosServiceService,private contratoS:AdministradoresServiceService){}

  cargarClientes(){
    this.clientes = this.clienteS.cargarUsuario() 
  }



  seleccionarCliente(email: string) {
    this.clienteSeleccionado = true
    const cliente = this.clientes.find(cli => cli.email === email);
    if (cliente) {
      this.nombre = cliente.nombre;
      this.apellido = cliente.apellido
      this.correo = cliente.email
      this.numeroTelefonico = cliente.numeroTelefonico 
    }
  }
  
  actualizarCliente() {
    const nuevosDatos: Partial<Persona> = {
      nombre: this.nombre,
      apellido: this.apellido,
      numeroTelefonico: this.numeroTelefonico
    };
    const actualizado = this.clienteS.actualizarUsuario(this.correo, nuevosDatos);
    this.contratoS.actualizarContratosCliente(this.correo,nuevosDatos)
    this.cargarClientes() 
    if (actualizado) {
      console.log('Cliente actualizado correctamente');
      this.cargarClientes(); 
      this.alertError('Se actualizo correctamente')
    } else {
      console.log('Error: Cliente no encontrado');
    }
  }
  editarF = false
  editarrF(){
    this.editarF = !this.editarF
  }

  menuVisibleIndex: number | null = null;
  
  toggleMenu(index: number) {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
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

  textAlert = ''
  showWarningAlert = false
  alertWarning(error: string) {
    setTimeout(() => {
      this.textAlert = error
      this.showWarningAlert = true;
    }, 4);
    this.textAlert = ''
    this.showWarningAlert = false;
  }
}
