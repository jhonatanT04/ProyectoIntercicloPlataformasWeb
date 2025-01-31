import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { Persona } from '../../models/persona';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { ContratoService } from '../../services/contrato.service';

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
    this.email = this.loginS.getUserEmail() || '';

    this.userS.getPersonaByEmail(this.email).subscribe(
      (user) => {
        if (user) {
          this.nombre = user.nombre || '';
          this.apellido = user.apellido || '';
          this.direccion = user.direccion || '';
          this.codigo = user.cedula || '';
          this.contra = user.password || '';
          this.numeroTelefonico = user.telefono || '';

          this.perfilForm = new FormGroup({
            nombre: new FormControl(this.nombre, Validators.required),
            apellido: new FormControl(this.apellido, Validators.required),
            numeroTelefonico: new FormControl(this.numeroTelefonico, [
              Validators.required,
              Validators.pattern(/^\d{10}$/)
            ]),
            direccion: new FormControl(this.direccion, Validators.required),
            codigo: new FormControl(this.codigo, [
              Validators.required,
              Validators.pattern(/^\d{10}$/)
            ])
          });
        } else {
          console.error('No se encontró el usuario');
        }
      },
      (error) => {
        console.error('Error al cargar el usuario', error);
      }
    );
  }
  constructor(private userS:UsuariosServiceService,private loginS:AuthentificServiceService,private contratoS:ContratoService){}

  @Output() actualizado = new EventEmitter();
  email =''
  nombre=''
  apellido=''
  numeroTelefonico=''
  direccion=''
  contra=''
  codigo=''
  

  actualizar(): void {
    if (this.perfilForm.valid) {
      this.userS.getPersonaByEmail(this.email).subscribe(
        (persona) => {
          if (persona) {
            const personaActualizada = new Persona(
              persona.id,
              this.email,
              this.contra,
              this.perfilForm.get('nombre')?.value || '',
              this.perfilForm.get('apellido')?.value || '',
              this.perfilForm.get('numeroTelefonico')?.value || '',
              this.perfilForm.get('direccion')?.value || '',
              this.perfilForm.get('codigo')?.value || '',
              persona.rol, 
              persona.listaContratos 
            );
              this.userS.updatePersona(personaActualizada).subscribe(
              () => {
                console.log('Usuario actualizado correctamente');
                this.perfilForm.reset() 
              },
              (error) => console.error('Error al actualizar el usuario', error)
            );
          } else {
            console.error('No se encontró la persona con el email proporcionado.');
          }
        },
        (error) => console.error('Error al obtener la persona', error)
      );
    } else {
      console.warn('Formulario inválido, por favor revisa los campos.');
    }
  }
  
}
