import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';
import { Tarifa } from '../../models/tarifa';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.scss'
})
export class TarifasComponent implements OnInit{
  tarifas:any =[]
  tipo=''
  costo =0

  tarifaForm = new FormGroup({
    tiempo: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required, Validators.min(0)])
  });
  constructor(private  tarifaS:AdministradoresServiceService){}

  ngOnInit(): void {
    this.cargarTarifa()
  }

  agregarTarifa() {
    if (this.tarifaForm.valid) {
      const costo = parseFloat(this.tarifaForm.get('costo')?.value || '')??0;
      const nuevaTarifa = new Tarifa(
        this.tarifaForm.get('tiempo')?.value || '', costo
      );
      this.tarifaS.agregarTarifa(nuevaTarifa);
      this.cargarTarifa();
      this.tarifaForm.reset();  
      this.alertError('Se agrego correctamente')
    } else {
      this.tarifaForm.markAllAsTouched(); 
    }
  }

  actualizarTarifa() {
    if (this.tarifaForm.valid) {
      const costo = parseFloat(this.tarifaForm.get('costo')?.value || '') ?? 0;
      const tipo = this.tarifaForm.get('tiempo')?.value || '';
  
      const nuevosDatos = new Tarifa(tipo, costo);
      const actualizacionExitosa = this.tarifaS.actualizarTarifa(tipo, nuevosDatos);
  
      if (actualizacionExitosa) {
        this.cargarTarifa(); 
        this.tarifaForm.reset();  
        this.alertError('Tarifa actualizada correctamente'); 
      } else {
        this.alertError('No se encontró la tarifa para actualizar');
      }
    } else {
      this.tarifaForm.markAllAsTouched();
    }
  }
  

  eliminarTarifa(tarifa:any){
    this.tarifaS.eliminarTarifa(tarifa)
    this.cargarTarifa() 
  }

  cargarTarifa(){
    this.tarifas = this.tarifaS.cargarTarifa()
  }

  menuVisibleIndex: number | null = null;

  toggleMenu(index: number) {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }
  tarifasAgregar=false
  tarifass(){
    this.tarifasAgregar = !this.tarifasAgregar
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

  textAlert = ''
  showWarningAlert = false
  alertWarning(error: string) {
    setTimeout(() => {
      this.textAlert = error
      this.showWarningAlert = true;
    }, 4);
    this.textAlert = ''
    this.showWarningAlert = false;
  }
}
