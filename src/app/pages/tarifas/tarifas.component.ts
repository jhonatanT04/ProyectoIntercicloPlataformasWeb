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
  tarifasAgregar = false
  tarifaForm = new FormGroup({
    tiempo: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required, Validators.min(0)])
  });

  tarifaFormA = new FormGroup({
    tiempo: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required, Validators.min(0)])
  });
  constructor(private  tarifaS:AdministradoresServiceService){}

  data: any;

  ngOnInit(): void {
    this.cargarTarifa()
    this.tarifaS.getExample().subscribe(
      (response) => {
        this.data = response; // Maneja la respuesta del servidor
        console.log(this.data);
      },
      (error) => {
        console.error('Error al conectar con el servidor:', error);
      }
    );
  }

  agregarTarifa() {
    if (this.tarifaFormA.valid) {
      const costo = parseFloat(this.tarifaFormA.get('costo')?.value || '')??0;
      const nuevaTarifa = new Tarifa(
        this.tarifaFormA.get('tiempo')?.value || '', costo
      );
      this.tarifaS.agregarTarifa(nuevaTarifa);
      this.cargarTarifa();
      this.tarifaFormA.reset();  
      this.alertConfirm('Se agrego correctamente')
    } else {
      this.tarifaFormA.markAllAsTouched(); 
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
        this.alertConfirm('Tarifa actualizada correctamente'); 
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
  tarifasActualizar=false
  tarifass(){
    this.tarifasActualizar = !this.tarifasActualizar
  }

  tarifasA(){
    this.tarifasAgregar = !this.tarifasAgregar
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
