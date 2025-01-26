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
  styleUrls: ['./registro.component.scss'] // Cambié 'styleUrl' a 'styleUrls' (es un array)
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  historial: Registro[] = [];

  constructor(private fb: FormBuilder, private parqueaderoService: AdministradoresServiceService) {
    this.registroForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9-]+$')]], // Validación de placa
      fechaIngreso: ['', [Validators.required]], // Fecha de ingreso obligatoria
      fechaSalida: [''] // Fecha de salida opcional
    });
  }

  ngOnInit(): void {
    this.obtenerHistorial('dia'); // Cargar historial inicial por día
  }

  registrarVehiculo() {
    if (this.registroForm.valid) {
      const datos: Registro = {
        placa: this.registroForm.get('placa')?.value || '',
        fechaIngreso: this.registroForm.get('fechaIngreso')?.value || '',
        fechaSalida: this.registroForm.get('fechaSalida')?.value || null // Fecha de salida opcional
      };

      if (!datos.fechaSalida) {
        // Registrar ingreso
        this.parqueaderoService.registrarIngreso(datos).subscribe(
          () => {
            alert('Ingreso registrado correctamente.');
            this.obtenerHistorial('dia');
          },
          (error) => console.error('Error registrando ingreso:', error)
        );
      } else {
        // Registrar salida
        this.parqueaderoService.registrarSalida(datos).subscribe(
          () => {
            alert('Salida registrada correctamente.');
            this.obtenerHistorial('dia');
          },
          (error) => console.error('Error registrando salida:', error)
        );
      }
    } else {
      alert('Por favor, complete todos los campos requeridos correctamente.');
    }
  }

  obtenerHistorial(periodo: 'dia' | 'semana' | 'mes') {
    this.parqueaderoService.obtenerHistorial(periodo).subscribe(
      (data) => (this.historial = data),
      (error) => console.error('Error obteniendo historial:', error)
    );
  }
}
