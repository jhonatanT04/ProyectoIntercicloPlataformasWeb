import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Registro } from '../../models/registro';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  vehiculosEnParqueadero: Registro[] = [];
  historial: Registro[] = [];
  valorApagar = 0;
  constructor(private fb: FormBuilder, private parqueaderoService: AdministradoresServiceService,private ticketService: TicketService) {
    this.registroForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9-]+$')]]
    });
  }

  ngOnInit(): void {
    this.obtenerHistorial('dia');
    this.cargarVehiculosEnParqueadero();
  }

  agregarVehiculo() {
    if (this.registroForm.valid) {
      const nuevoVehiculo: Registro = {
        id: 0,
        placa: this.registroForm.get('placa')?.value || '',
        tipo: " ",
        fechaIngreso: new Date(),
        fechaSalida: null
      };

      this.parqueaderoService.registrarIngreso(nuevoVehiculo).subscribe(
        () => {
          this.registroForm.reset();
          this.cargarVehiculosEnParqueadero()
          this.alertConfirm('Vehículo registrado correctamente.')
        },
        error => {
          this.alertError(error.error.mensaje)
        }
      );
    }
  }

  confirmacionEdit = false
  setConfirmacionEdit() {
    this.confirmacionEdit = !this.confirmacionEdit
  }

  registrarSalida(vehiculo: Registro) {
    const salidaVehiculo: Registro = {
      id: vehiculo.id,
      placa: vehiculo.placa,
      tipo: vehiculo.tipo,
      fechaIngreso: vehiculo.fechaIngreso,
      fechaSalida: null
    };
    if (vehiculo.tipo === 'T') {
      this.confirmacionEdit = true
      this.ticketService.valorApagarTicket(vehiculo.placa).subscribe(
        (a) => {
          this.valorApagar = a.valorTotal
        }
      )
    } else {
      this.parqueaderoService.registrarSalida(salidaVehiculo).subscribe(
        () => {
          this.vehiculosEnParqueadero = this.vehiculosEnParqueadero.filter(v => v.placa !== vehiculo.placa);
          this.obtenerHistorial('dia');
          this.cargarVehiculosEnParqueadero()
          this.alertConfirm('Salida registrada correctamente')
        },
        error => {
          this.alertError(error.error.mensaje)
        }
      );
    }
  }


  obtenerHistorial(periodo: 'dia' | 'semana' | 'mes') {
    this.parqueaderoService.obtenerHistorial(periodo).subscribe(
      (data) => (this.historial = data),
      (error) => console.error('Error obteniendo historial:', error)
    );
  }

  cargarVehiculosEnParqueadero() {
    this.parqueaderoService.obtenerVehiculosEnParqueadero().subscribe(
      (data) => (this.vehiculosEnParqueadero = data),
      (error) => console.error('Error obteniendo vehículos en parqueadero:', error)
    );
  }


  showDangerAlert = false;
  textError = ''
  alertError(error: string) {
    this.showDangerAlert = true;
    this.textError = error
    setTimeout(() => {
      this.textError = ''
      this.showDangerAlert = false;
    }, 5000);
  }


  textConfirm = ''
  showConfirmAlert = false
  alertConfirm(error: string) {
    this.showConfirmAlert = true;
    this.textConfirm = error
    setTimeout(() => {
      this.textConfirm = ''
      this.showConfirmAlert = false;
    }, 5000);
  }
}
