import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { TarifasComponent } from '../../pages/tarifas/tarifas.component';
import { HorariosComponent } from '../../pages/horarios/horarios.component';
import { ContratosComponent } from '../../pages/contratos/contratos.component';
import { ListaUsuariosComponent } from '../../pages/lista-usuarios/lista-usuarios.component';
import { GestionEspaciosComponent } from '../../pages/gestion-espacios/gestion-espacios.component';
import { CommonModule } from '@angular/common';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Persona } from '../../models/persona';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroComponent } from "../registro/registro.component";
import { JWTService } from '../../services/jwt.service';

@Component({
  selector: 'app-administadores',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, TarifasComponent, HorariosComponent, ContratosComponent, ListaUsuariosComponent, GestionEspaciosComponent, CommonModule, FormsModule, RegistroComponent],
  templateUrl: './administadores.component.html',
  styleUrl: './administadores.component.scss'
})
export class AdministadoresComponent implements OnInit {
  authServicio = inject(AuthentificServiceService)
  router = inject(Router)
  
  isPerfil = false
  menuMovil = false 
  adminS = inject(AdministradoresServiceService)
  jwtService = inject(JWTService)
  userService = inject(UsuariosServiceService)

  formAdmin = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required]),
    numberPhone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    addres: new FormControl('', [Validators.required]),
    codeZip: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })
  administradorData:any = Persona 
  cdRef=inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.cargarDatosAdministrador()
  }

  cargarDatosAdministrador(){
    this.userService.getPerfil().subscribe(
      (a)=>
        this.administradorData = a
      )
  }

  cerrarSeccion() {
    this.jwtService.deleteToken();
    this.authServicio.logout().then(() =>
      this.router.navigate(['pages/login'])
    ).catch(error => console.log(error))
  }
  
  desplegarMenuMovil() {
    this.menuMovil = !this.menuMovil
  }

  espacios: boolean = false
  contratos: boolean = false
  tarifas: boolean = false
  horarios: boolean = false
  clientes: boolean = false
  historial: boolean = false
  seccionabierta: string = '';

  abrirSeccion(seccion: string) {
    this.seccionabierta = this.seccionabierta === seccion ? '' : seccion;
  }

  seccionAbierta(seccion: string): boolean {
    return this.seccionabierta === seccion;
  }
  imgView = true
  getImgServicie() {
    if (this.authServicio.getInfo()?.photoURL !== null && this.authServicio.getInfo()?.photoURL !== undefined) {
      return this.authServicio.getInfo()?.photoURL
    } else {
      this.imgView = false
      return null
    }
  }
  menuAnimationClass = '';

  accionPerfil() {
    if (this.isPerfil) {
      this.menuAnimationClass = 'menu-exit';
      setTimeout(() => {
        this.isPerfil = false;
        this.menuAnimationClass = '';
      }, 300);
    } else {
      this.isPerfil = true;
      this.menuAnimationClass = 'menu-enter';
    }
  }

  perfilDatosView = false
  redireccionarPerfil() {
    this.perfilDatosView = !this.perfilDatosView;
    this.userService.getPerfil().subscribe(
      {next:(a)=>
        this.formAdmin = new FormGroup({
          name: new FormControl(a.nombre, [Validators.required, Validators.minLength(2)]),
          lastName: new FormControl(a.apellido, [Validators.required]),
          numberPhone: new FormControl(a.telefono, [Validators.required, Validators.minLength(10)]),
          addres: new FormControl(a.direccion, [Validators.required]),
          codeZip: new FormControl(a.cedula, [Validators.required, Validators.minLength(10)]),
        })
      }
    )
  }
  editPerfil = false
  editarPerfil() {
    this.editPerfil = !this.editPerfil
  }

  confirmacionEdit = false
  setConfirmacionEdit() {
    if (this.formAdmin.valid) {
      this.confirmacionEdit = !this.confirmacionEdit
    }else{
      this.alertError('Complete los campos de manera correcta')
    }
  }
  
  
  

  actualizarPerfil() {
    const per = new Persona(
      this.administradorData.id,
      this.administradorData.email,
      this.administradorData.password,
      this.formAdmin.get('name')?.value || ' ',
      this.formAdmin.get('lastName')?.value || ' ',
      this.formAdmin.get('numberPhone')?.value || ' ',
      this.formAdmin.get('addres')?.value || ' ',
      this.formAdmin.get('codeZip')?.value || ' ',
      true
    );
    this.userService.updatePersona(per).subscribe((a)=>{
      this.alertConfirm('Se actualizo de manera correcta')
      this.cargarDatosAdministrador()
    })
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
