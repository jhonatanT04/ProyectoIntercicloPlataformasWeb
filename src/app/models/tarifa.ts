export class Tarifa {
    id:number
    tiempo:string
    costo:number

    constructor(id:number,tiempo:string,costo:number){
        this.id=id
        this.tiempo = tiempo
        this.costo = costo
    }
}
