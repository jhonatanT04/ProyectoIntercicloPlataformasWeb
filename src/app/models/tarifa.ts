export class Tarifa {
    id:number
    tiempo:number
    tipo:string = ''
    costo:number
    constructor(id:number,tiempo:number,costo:number,tipo:string){
        this.id=id
        this.tiempo = tiempo
        this.costo = costo
        this.tipo = tipo
    }
}
