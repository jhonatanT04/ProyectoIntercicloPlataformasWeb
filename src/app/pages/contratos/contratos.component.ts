import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { UsuariosServiceService } from '../../services/usuarios-service.service';
import { Contrato } from '../../models/contrato';
import { AuthentificServiceService } from '../../services/authentific-service.service';

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.scss'
})
export class ContratosComponent implements OnInit {

  espacios: any = []
  espaciosF: any = []
  contratos: any = []
  clientes: any = []
  tarifas: any = []

  email1 : string | null = null;
  cliente = ''
  espacio = ''
  duracion = 0
  tarifa = 0
  placa = ''

  contratoForm = new FormGroup({
    cliente: new FormControl('', [Validators.required]),
    espacio: new FormControl('', [Validators.required]),
    duracion: new FormControl('', [Validators.required, Validators.min(1)]),
    tarifa: new FormControl('', [Validators.required]),
    placa: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{3}-\\d{4}$')])
  });
  constructor(private contratoS: AdministradoresServiceService, private clienteS: UsuariosServiceService,private login:AuthentificServiceService) { }
  ngOnInit(): void {
    this.cargarContratos()
    this.cargarEspacios()
    this.cargarClientes()
    this.cargarTarifas()
    this.email1 = this.login.getUserEmail()
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
      const duracion = parseFloat(this.contratoForm.get('duracion')?.value||'') ?? 0;
      const tarifa = parseFloat(this.contratoForm.get('tarifa')?.value ||'')?? 0;
      const nombre = this.contratoS.buscarAdminPorEmail(this.email1 || '')?.nombre || '';
      const contrato = new Contrato(
        this.contratoForm.get('cliente')?.value || '',
        this.contratoForm.get('espacio')?.value || '',
        duracion,
        tarifa,
        this.contratoForm.get('placa')?.value || '',
        nombre
      );
  
      this.contratoS.agregarContrato(contrato,this.contratoForm.get('espacio')?.value || '');
      this.cargarContratos();
      this.contratoForm.reset() 
    } else {
      this.contratoForm.markAllAsTouched();
    }
  }

  eliminarContrato(contrato: any) {
    this.contratoS.eliminarContrato(contrato)
    this.cargarContratos()
  }
}
