import { Persona } from "./persona"

export class Contrato {
    cliente:Persona
    nombreE:string
    placa:string
    nombreA:string
    fechaInicio:Date
    fechaFin:Date

    constructor(cliente:Persona,nombreE:string,placa:string,nombreA:string,fechaInicio:Date,fechaFin:Date){
        this.cliente = cliente
        this.nombreE = nombreE
        this.placa = placa
        this.nombreA = nombreA
        this.fechaInicio = fechaInicio
        this.fechaFin = fechaFin
    }
}
