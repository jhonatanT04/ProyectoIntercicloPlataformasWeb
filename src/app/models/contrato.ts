import { Persona } from "./persona"

export class Contrato {
    cliente:Persona
    nombreE:string
    duracion:number
    tarifa:number
    placa:string
    nombreA:string

    constructor(cliente:Persona,nombreE:string,duracion:number,tarifa:number,placa:string,nombreA:string){
        this.cliente = cliente
        this.nombreE = nombreE
        this.duracion = duracion
        this.tarifa = tarifa
        this.placa = placa
        this.nombreA = nombreA
    }
}
