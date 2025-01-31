import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Registro } from '../../models/registro';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private parqueaderoService: AdministradoresServiceService) {
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
        fechaIngreso: new Date(), 
        fechaSalida: null
      };
  
      this.parqueaderoService.registrarIngreso(nuevoVehiculo).subscribe(
        () => {
          this.registroForm.reset();
          this.cargarVehiculosEnParqueadero()
          console.log('Vehículo registrado correctamente.');
        },
        error => {
          console.error('Error registrando vehículo:', error);
          alert('Error al registrar el vehículo. Intente de nuevo.');
        }
      );
    }
  }
  

  registrarSalida(vehiculo: Registro) {
    console.log(vehiculo.id)
    const salidaVehiculo: Registro = {
      id: vehiculo.id,
      placa: vehiculo.placa,  
      fechaIngreso: vehiculo.fechaIngreso,  
      fechaSalida: new Date()  
    };
  
    this.parqueaderoService.registrarSalida(salidaVehiculo).subscribe(
      () => {
        this.vehiculosEnParqueadero = this.vehiculosEnParqueadero.filter(v => v.placa !== vehiculo.placa);
        
        this.obtenerHistorial('dia');
        this.cargarVehiculosEnParqueadero() 
  
        console.log('Salida registrada correctamente.');
      },
      error => {
        console.error('Error registrando salida:', error);
        alert('Error al registrar la salida. Intente de nuevo.');
      }
    );
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
}
