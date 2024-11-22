import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Contrato } from '../../models/contrato';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { Persona } from '../../models/persona';

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.scss'
})
export class ContratosComponent implements OnInit {

  espacios: any = []
  espaciosF: any = []
  contratos: any = []
  clientes: any = []
  tarifas: any = []

  email1: string = '';
  cliente = ''
  espacio = ''
  duracion = 0
  tarifa = 0
  placa = ''
  fechaInicio = ''
  fechaFin = ''
  fechaInvalida: boolean = false

  contratoForm = new FormGroup({
    cliente: new FormControl('', [Validators.required]),
    espacio: new FormControl('', [Validators.required]),
    placa: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{3}-\\d{4}$')]),
    fechaInicio: new FormControl('', [Validators.required]),
    fechaFin: new FormControl('', [Validators.required]),
  },{validators: this.validarFechas('fechaInicio','fechaFin')}
  );
  constructor(private contratoS: AdministradoresServiceService, private clienteS: UsuariosServiceService, private login: AuthentificServiceService, private userS: UsuariosServiceService) { }
  ngOnInit(): void {
    this.cargarContratos()
    this.cargarEspacios()
    this.cargarClientes()
    this.cargarTarifas()
    this.email1 = this.login.getUserEmail()
  }

  validarFechas(fieldInicio: string, fieldFin: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fechaInicio = formGroup.get(fieldInicio)?.value;
      const fechaFin = formGroup.get(fieldFin)?.value;

      if (fechaInicio && fechaFin && new Date(fechaInicio) >= new Date(fechaFin)) {
        return { fechaInvalida: true }; 
      }

      return null; 
    }
  }


  cargarClientes() {
    this.clientes = this.clienteS.cargarUsuario()
  }
  cargarEspacios() {
    this.espacios = this.contratoS.cargarEspacios()
    this.filtrarEspacios()
  }

  filtrarEspacios() {
    this.espaciosF = [];
    for (const espacio of this.espacios) {
      if (espacio.estado === 'D') {
        this.espaciosF.push(espacio);
      }
    }
    
  }

  cargarContratos() {
    this.contratos = this.contratoS.cargarContratos()
  }

  cargarTarifas() {
    this.tarifas = this.contratoS.cargarTarifa()
  }

  agregarContrato() {
    if (this.contratoForm.valid) {
      const duracion = parseFloat(this.contratoForm.get('duracion')?.value || '') ?? 0;
      const tarifa = parseFloat(this.contratoForm.get('tarifa')?.value || '') ?? 0;
      const nombre = this.contratoS.buscarAdminPorEmail(this.email1 || '')?.nombre || '';
      const per = this.userS.buscarUsuarioPorEmail(this.contratoForm.get('cliente')?.value || '');

      if (per) {
        const cliente = new Persona(
          per.email,
          per.password,
          per.nombre,
          per.apellido,
          per.numeroTelefonico,
          per.direccion,
          per.codigo,
          
          per.rolAdministrativo
        );

        const contrato = new Contrato(
          cliente,
          this.contratoForm.get('espacio')?.value || '',
          this.contratoForm.get('placa')?.value || '',
          nombre,
          new Date(this.contratoForm.get('fechaInicio')?.value || ''),
          new Date(this.contratoForm.get('fechaFin')?.value || '')
        );

        this.contratoS.agregarContrato(contrato, this.contratoForm.get('espacio')?.value || '');
        this.cargarContratos();
        this.contratoForm.reset()
        this.alertConfirm("Se ingreso correctamente")
      }
    } else {
      this.contratoForm.markAllAsTouched();
      this.alertError("No se insegro corecctamente")
    }
  }

  eliminarContrato(contrato: any) {
    this.contratoS.eliminarContrato(contrato)
    this.cargarContratos()
  }

  agregaContrato = false
  contrato() {
    this.agregaContrato = !this.agregaContrato
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

  textConfirm = ''
  showConfirmAlert = false
  alertConfirm(error: string) {
    setTimeout(() => {
      this.textConfirm = error
      this.showConfirmAlert = true;
    }, 4);
    this.textConfirm = ''
    this.showConfirmAlert = false;
  }
}
