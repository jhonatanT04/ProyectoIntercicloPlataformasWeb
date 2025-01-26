export class Ticket {
    id: number;
    placa: string;
    fechaIngreso: string;
    fechaSalida: string;
    valorTotal: number;
    constructor(
        id: number,
        placa: string,
        fechaIngreso: string,
        fechaSalida: string,
        valorTotal:number
    ){
        this.id = id;
        this.placa = placa;
        this.fechaIngreso = fechaIngreso;
        this.fechaSalida = fechaSalida;
        this.valorTotal = valorTotal;
    }
}
