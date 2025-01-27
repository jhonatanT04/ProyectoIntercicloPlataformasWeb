import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Contrato } from '../../models/contrato';
import { AuthentificServiceService } from '../../services/authentific-service.service';
import { Persona } from '../../models/persona';
import { Tarifa } from '../../models/tarifa';
import { ContratoService } from '../../services/contrato.service';
import { TarifasService } from '../../services/tarifas.service';
import { EspacioService } from '../../services/espacio.service';
import { Espacio } from '../../models/espacio';

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.scss'
})
export class ContratosComponent implements OnInit {

  espacios: Espacio[] = []
  espaciosF: Espacio[] = []
  contratos: Contrato[] = []
  clientes: any = []
  tarifas: Tarifa[] = []

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
    tarifa: new FormControl('', [Validators.required]),
  },{validators: this.validarFechas('fechaInicio','fechaFin')},
  );
  constructor(private contratoS: ContratoService, private Contrato: AdministradoresServiceService,private clienteS: UsuariosServiceService, private login: AuthentificServiceService, private userS: UsuariosServiceService,private tarifaS: TarifasService, private espacioS: EspacioService) { }
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
    this.espacioS.listEspacios().subscribe(
      (data) => {
        this.espacios = data;
      },
      (error) => this.alertError('Error al cargar los espacios.')
    );
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

  cargarContratos(): void {
    this.contratoS.getContratos().subscribe(
      (data) => (this.contratos = data),
      (error) => this.alertError('Error al cargar los contratos.')
    );
  }

  cargarTarifas() {
    this.tarifaS.listTarifas().subscribe(
      (data) => (this.tarifas = data),
      (error) => this.alertError('Error al cargar las tarifas.')
    );
  }

  agregarContrato(): void {
    if (this.contratoForm.valid) {
      const clienteEmail = this.contratoForm.get('cliente')?.value || '';
      const tarifaId = this.contratoForm.get('tarifa')?.value || '';
      const espacioNombre = this.contratoForm.get('espacio')?.value || '';
  
      let usuario = null;
      let tarifa = null;
      let espacio = null;
  
      for (let c of this.clientes) {
        if (c.email === clienteEmail) {
          usuario = c;
          break;
        }
      }
  
      for (let t of this.tarifas) {
        if (t.id === +tarifaId) {
          tarifa = t;
          break;
        }
      }
  
      for (let e of this.espacios) {
        if (e.nombreEspacio === espacioNombre) {
          espacio = e;
          break;
        }
      }
  
      if (usuario && tarifa && espacio) {
        const contrato: Contrato = {
          id: 0, 
          usuario,
          espacio, 
          placa: this.contratoForm.get('placa')?.value || '',
          fechaInicio: new Date(this.contratoForm.get('fechaInicio')?.value || ''),
          fechaFin: new Date(this.contratoForm.get('fechaFin')?.value || ''),
          tarifa,
        };
  
        this.contratoS.createContrato(contrato).subscribe(
          () => {
            this.cargarContratos();
            this.filtrarEspacios();
            this.contratoForm.reset();
            this.alertConfirm('Contrato agregado correctamente.');
          },
          (error) => this.alertError('Error al agregar el contrato.')
        );
      } else {
        this.alertError('Cliente, tarifa, o espacio no válidos.');
      }
    } else {
      this.contratoForm.markAllAsTouched();
      this.alertError('Formulario inválido. Por favor revisa los campos.');
    }
  }
  
  eliminarContrato(contrato: Contrato): void {
    if (contrato.id) {
      this.contratoS.deleteContrato(contrato.id).subscribe(
        () => {
          this.cargarContratos();
          this.alertConfirm('Contrato eliminado correctamente.');
        },
        (error) => this.alertError('Error al eliminar el contrato.')
      );
    }
  }
  
  agregaContrato = false
  contrato() {
    this.contratoForm.reset() 
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
  }

  textConfirm = ''
  showConfirmAlert = false
  alertConfirm(error: string) {
    setTimeout(() => {
      this.textConfirm = error
      this.showConfirmAlert = true;
    }, 4);
  }
}
