import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdministradoresServiceService } from '../../services/administradores-service.service';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.scss'
})
export class TarifasComponent implements OnInit{
  tarifas:any =[]
  tipo=''
  costo =0

  constructor(private  tarifaS:AdministradoresServiceService){}

  ngOnInit(): void {
    this.cargarTarifa()
  }

  agregarTarifa(){
    this.tarifaS.agregarTarifa(this.tipo,this.costo);
    this.cargarTarifa()
  }

  eliminarTarifa(tarifa:any){
    this.tarifaS.eliminarTarifa(tarifa)
    this.cargarTarifa() 
  }

  cargarTarifa(){
    this.tarifas = this.tarifaS.cargarTarifa()
  }
}
