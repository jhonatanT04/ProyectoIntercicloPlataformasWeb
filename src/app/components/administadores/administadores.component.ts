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
  userS = inject(UsuariosServiceService)
  name = ''
  email = ''
  cdRef=inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.email = this.authServicio.getInfo()?.email || '';
    this.name = this.adminS.buscarAdminPorEmail(this.email)?.nombre || ''
  }

  

  cerrarSeccion() {
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
    this.formAdmin = new FormGroup({
      name: new FormControl(this.adminS.buscarAdminPorEmail(this.email)?.nombre, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(this.adminS.buscarAdminPorEmail(this.email)?.apellido, [Validators.required]),
      numberPhone: new FormControl(this.adminS.buscarAdminPorEmail(this.email)?.numeroTelefonico, [Validators.required, Validators.minLength(10)]),
      addres: new FormControl(this.adminS.buscarAdminPorEmail(this.email)?.direccion, [Validators.required]),
      codeZip: new FormControl(this.adminS.buscarAdminPorEmail(this.email)?.codigo, [Validators.required, Validators.minLength(10)]),
    })
  }
  editPerfil = false
  editarPerfil() {
    console.log(this.adminS.buscarAdminPorEmail(this.email)?.numeroTelefonico)
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
  formAdmin = new FormGroup({
    name: new FormControl(this.adminS.buscarAdminPorEmail(this.email)?.nombre, [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl(this.adminS.buscarAdminPorEmail(this.email)?.apellido, [Validators.required]),
    numberPhone: new FormControl(this.adminS.buscarAdminPorEmail(this.email)?.numeroTelefonico, [Validators.required, Validators.minLength(10)]),
    addres: new FormControl(this.adminS.buscarAdminPorEmail(this.email)?.direccion, [Validators.required]),
    codeZip: new FormControl(this.adminS.buscarAdminPorEmail(this.email)?.codigo, [Validators.required, Validators.minLength(10)]),
  })
  
  

  actualizarPerfil() {
    
    const per = new Persona(
      this.email,
      '',
      this.formAdmin.get('name')?.value || ' ',
      this.formAdmin.get('lastName')?.value || ' ',
      this.formAdmin.get('numberPhone')?.value || ' ',
      this.formAdmin.get('addres')?.value || ' ',
      this.formAdmin.get('codeZip')?.value || ' ',
      true
    );
    this.userS.actualizarUsuario(this.email, per);
    this.alertConfirm('Se actualizo de manera correcta')
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
