export class Contrato {
    nombreC:string
    nombreE:string
    duracion:number
    tarifa:number
    placa:string
    nombreA:string

    constructor(nombreC:string,nombreE:string,duracion:number,tarifa:number,placa:string,nombreA:string){
        this.nombreC = nombreC
        this.nombreE = nombreE
        this.duracion = duracion
        this.tarifa = tarifa
        this.placa = placa
        this.nombreA = nombreA
    }
}
