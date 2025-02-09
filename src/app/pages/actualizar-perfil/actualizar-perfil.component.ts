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
  perfilForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    numeroTelefonico: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ]),
    direccion: new FormControl('', Validators.required),
    codigo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ])
  });

  ngOnInit(): void {
    this.cargarDatos()
  }
  cargarDatos(){
    this.userS.getPerfil().subscribe(
      (user) => {
        if (user) {
          
          this.nombre = user.nombre || '';
          this.apellido = user.apellido || '';
          this.direccion = user.direccion || '';
          this.codigo = user.cedula || '';
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
    )
  }
  constructor(private userS:UsuariosServiceService,private loginS:AuthentificServiceService,private contratoS:ContratoService){}

  @Output() actualizado = new EventEmitter();
  nombre=''
  apellido=''
  numeroTelefonico=''
  direccion=''
  codigo=''
  

  actualizar(): void {
    if (this.perfilForm.valid) {
      this.userS.getPerfil().subscribe(
        (persona) => {
          if (persona) {
            const personaActualizada = new Persona(
              persona.id,
              persona.email,
              persona.password,
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
                this.cargarDatos() 
                this.alertConfirm('Se Actualizo la información')
              },
              (error) => this.alertError('Error al actualizar el usuario '+ error)
            );
          } else {
            this.alertError('No se encontró la persona con el email proporcionado.');
          }
        },
        (error) => this.alertError('Error al obtener la persona '+ error)
      );
    } else {
      this.alertError('Formulario inválido, por favor revisa los campos.');
    }
  }
  


  showDangerAlert = false;
  textError = ''
  alertError(error: string) {
    this.showDangerAlert = true;
    this.textError = error
    setTimeout(() => {
      this.textError = ''
      this.showDangerAlert = false;
    },5000);
  }


  textConfirm = ''
  showConfirmAlert = false
  alertConfirm(error: string) {
    this.showConfirmAlert = true;
    this.textConfirm = error
    setTimeout(() => {
      this.textConfirm = ''
      this.showConfirmAlert = false;
    },5000);
  }
}
