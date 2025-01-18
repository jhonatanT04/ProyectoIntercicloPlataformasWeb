import { Persona } from "./persona"
import { Tarifa } from "./tarifa"

export class Contrato {
    cliente:Persona
    nombreE:string
    placa:string
    nombreA:string
    fechaInicio:Date
    fechaFin:Date
    tarifa:Tarifa

    constructor(cliente:Persona,nombreE:string,placa:string,nombreA:string,fechaInicio:Date,fechaFin:Date,tarifa:Tarifa){
        this.cliente = cliente
        this.nombreE = nombreE
        this.placa = placa
        this.nombreA = nombreA
        this.fechaInicio = fechaInicio
        this.fechaFin = fechaFin
        this.tarifa = tarifa
    }
}
