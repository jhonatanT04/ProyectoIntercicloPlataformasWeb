import { Persona } from "./persona"

export class Contrato {
    cliente:Persona
    nombreE:string
    duracion:number
    tarifa:number
    placa:string
    nombreA:string
    fechaInicio:Date
    fechaFin:Date

    constructor(cliente:Persona,nombreE:string,duracion:number,tarifa:number,placa:string,nombreA:string,fechaInicio:Date,fechaFin:Date){
        this.cliente = cliente
        this.nombreE = nombreE
        this.duracion = duracion
        this.tarifa = tarifa
        this.placa = placa
        this.nombreA = nombreA
        this.fechaInicio = fechaInicio
        this.fechaFin = fechaFin
    }
}
