import { Espacio } from "./espacio"
import { Persona } from "./persona"
import { Tarifa } from "./tarifa"

export class Contrato {
    id:number
    usuario:Persona
    espacio:Espacio
    placa:string
    fechaInicio:Date
    fechaFin:Date
    tarifa:Tarifa

    constructor(id:number,usuario:Persona,espacio:Espacio,placa:string,fechaInicio:Date,fechaFin:Date,tarifa:Tarifa){
        this.id=id
        this.usuario = usuario
        this.espacio = espacio
        this.placa = placa
        this.fechaInicio = fechaInicio
        this.fechaFin = fechaFin
        this.tarifa = tarifa
    }
}
