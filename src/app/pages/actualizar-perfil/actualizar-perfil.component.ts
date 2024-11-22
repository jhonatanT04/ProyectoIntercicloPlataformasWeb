import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { Persona } from '../../models/persona';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';

@Component({
  selector: 'app-actualizar-perfil',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './actualizar-perfil.component.html',
  styleUrl: './actualizar-perfil.component.scss'
})
export class ActualizarPerfilComponent implements OnInit{
  perfilForm!: FormGroup;
  ngOnInit(): void {
    this.email = this.loginS.getInfo()?.email || '';
    const user = this.userS.buscarUsuarioPorEmail(this.email);
    
    this.nombre = user?.nombre || '';
    this.apellido = user?.apellido || '';
    this.direccion = user?.direccion || '';
    
    this.codigo = user?.codigo || '';
    this.contra = user?.password || '';
    this.numeroTelefonico = user?.numeroTelefonico || '';
    this.email = user?.email || ''
    this.contra = user?.password || ''

    this.perfilForm = new FormGroup({
      nombre: new FormControl(this.nombre, Validators.required),
      apellido: new FormControl(this.apellido, Validators.required),
      numeroTelefonico: new FormControl(this.numeroTelefonico, Validators.required),
      direccion: new FormControl(this.direccion, Validators.required),
      codigo: new FormControl(this.codigo, Validators.required),
    });
  }
  constructor(private userS:UsuariosServiceService,private loginS:AuthentificServiceService,private contratoS:AdministradoresServiceService){}

  @Output() actualizado = new EventEmitter();
  email =''
  nombre=''
  apellido=''
  numeroTelefonico=''
  direccion=''
  contra=''
  codigo=''
  

  actualizar() {
    if (this.perfilForm.valid) {
      const nuevosDatos: Partial<Persona> = {
        nombre: this.perfilForm.get('nombre')?.value,
        apellido: this.perfilForm.get('apellido')?.value,
        numeroTelefonico: this.perfilForm.get('numeroTelefonico')?.value,
        direccion: this.perfilForm.get('direccion')?.value,
        codigo: this.perfilForm.get('codigo')?.value,
      };
      
      this.userS.actualizarUsuario(this.email, nuevosDatos);
      this.contratoS.actualizarContratosCliente(this.email, nuevosDatos);

      this.perfilForm.reset();
      this.actualizado.emit();
    } else {
      this.perfilForm.markAllAsTouched();
    }
  }
}
