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
import { error } from 'console';
import { TicketService } from '../../services/ticket.service';

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
  clientes: Persona[] = []
  tarifas: Tarifa[] = []
  fechaHoy: string = '';
  tarifaMesualSelected: Tarifa | null = null;
  email1: string = '';
  cliente = ''
  espacio = ''
  duracion = 0
  tarifa = 0
  placa = ''
  fechaInicio = ''
  fechaFin = ''
  fechaInvalida: boolean = false
  selectEspacio = false
  espacioSeleccionado: Espacio | null = null

  contratoForm = new FormGroup({
    cliente: new FormControl('', [Validators.required]),
    placa: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{3}-\\d{4}$')]),
    fechaInicio: new FormControl('', [Validators.required]),
    fechaFin: new FormControl('', [Validators.required]),
    tarifa: new FormControl('', [Validators.required]),
  },{validators: this.validarFechas('fechaInicio','fechaFin')},
  );
  constructor(private contratoS: ContratoService, private ticketS: TicketService,private clienteS: UsuariosServiceService, private login: AuthentificServiceService, private userS: UsuariosServiceService,private tarifaS: TarifasService, private espacioS: EspacioService) { }
  ngOnInit(): void {
    this.fechaHoy = new Date().toISOString().split('T')[0]; 
    this.cargarContratos()
    this.cargarEspacios()
    this.cargarClientes()
    this.cargarTarifas()
    this.email1 = this.login.getUserEmail()
    this.contratoForm.get('fechaInicio')?.valueChanges.subscribe(fechaInicio => {
      if (fechaInicio) {
        const nuevaFechaFin = new Date(fechaInicio);
        nuevaFechaFin.setMonth(nuevaFechaFin.getMonth() + 1); 
        this.contratoForm.get('fechaFin')?.setValue(nuevaFechaFin.toISOString().split('T')[0]);
      }
    });

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

  selecionarEspacio(espacio:Espacio) {
    this.espacioSeleccionado = espacio
    this.selectEspacio = true
  } 

  confirmarEspacio() {
    if (this.espacioSeleccionado) {
        this.selectEspacio = true;
    }
}

  cargarClientes() {
    this.clienteS.getPersonas().subscribe(
      (data) =>{
        this.clientes = data;
      },
      (error) => this.alertError('Error al cargar clientes')
    )
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
      (data) => {
        this.tarifas = data.filter(t => t.tipo === 'M'); 
      },
      (error) => this.alertError('Error al cargar las tarifas.')
    );
  }
  
  setTarifa(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const idSeleccionado = Number(selectElement.value);

    this.tarifaMesualSelected = this.tarifas.find(t => t.id === idSeleccionado) || null;
    console.log("Tarifa seleccionada:", this.tarifaMesualSelected);
}

  agregarContrato(): void {
    if (this.contratoForm.valid) {
        const clienteId = Number(this.contratoForm.get('cliente')?.value);
        const espacioSeleccionado = this.espacioSeleccionado;
        const placa = this.contratoForm.get('placa')?.value || '';
        console.log(this.contratoForm.get('tarifa')?.value || ''); 
        if (!espacioSeleccionado) {
            this.alertError('Debe seleccionar un espacio antes de continuar.');
            return;
        }
        if(this.tarifaMesualSelected === null){
            this.alertError('Debe seleccionar una tarifa antes de continuar.');
            return;
        }

        this.ticketS.validarPlaca(placa).subscribe(
            (tieneTicketActivo) => {
                if (tieneTicketActivo) {
                    this.alertError('No puedes registrar un contrato: Esta placa ya tiene un ticket activo.');
                    return;
                }

                this.clienteS.getPersonaById(clienteId).subscribe(usuario => {
                    const tarifa = this.tarifas.find(t => t.id === this.tarifaMesualSelected?.id) || null;
                    if (!usuario || !tarifa) {
                        this.alertError('Usuario o tarifa no válidos.');
                        return;
                    }

                    const fechaInicio = new Date(this.contratoForm.get('fechaInicio')?.value || '');
                    const fechaFin = new Date(this.contratoForm.get('fechaFin')?.value || '');

                    const contrato: Contrato = {
                        id: 0,
                        usuario,
                        espacio: espacioSeleccionado,
                        placa,
                        fechaInicio,
                        fechaFin,
                        tarifa,
                    };

                    this.contratoS.createContrato(contrato).subscribe(
                        (contratoCreado) => {
                            this.contratoS.actualizarEstadoEspacio(contratoCreado.id).subscribe(
                                () => {
                                    this.cargarEspacios();
                                    this.cargarContratos();

                                    this.contratoForm.reset();
                                    this.espacioSeleccionado = null;
                                    this.selectEspacio = false;
                                    this.agregaContrato = !this.agregaContrato;

                                    this.alertConfirm('Contrato agregado correctamente.');
                                },
                                (error) => this.alertError(error.error.mensaje)
                            );
                        },
                        (error) => this.alertError(error.error.mensaje)
                    );
                },
                (error) => this.alertError('Error al obtener el usuario del backend.'));
            },
            (error) => this.alertError('Error al validar la placa.')
        );
    } else {
        this.contratoForm.markAllAsTouched();
        this.alertError('Formulario inválido. Revisa los campos.');
    }
}


  
  eliminarContrato(contrato: Contrato): void {
    if (contrato.id) {
        this.contratoS.actualizarEstadoEspacioalEliminar(contrato.id).subscribe(
            () => {
                this.cargarEspacios(); 
                this.contratoS.deleteContrato(contrato.id).subscribe(
                    () => {
                        this.cargarContratos(); 
                        this.alertConfirm('Contrato eliminado correctamente.');
                    },
                    (error) => {
                        this.alertError('Error al eliminar el contrato.');
                    }
                );
            },
            (error) => {
                this.alertError('Error al actualizar el estado del espacio.');
            }
        );
    } else {
        this.alertError('No se encontró el ID del contrato.');
    }
  }

  
  agregaContrato = false
  contrato() {
    this.contratoForm.reset() 
    this.agregaContrato = !this.agregaContrato
    this.espacioSeleccionado = null; 
    this.selectEspacio = false;  
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
