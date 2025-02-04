import { Espacio } from "./espacio";

export class Ticket {
    id: number;
    placa: string;
    fechaIngreso: string;
    fechaSalida: string;
    valorTotal: number;
    espacio:Espacio
    constructor(
        id: number,
        placa: string,
        fechaIngreso: string,
        fechaSalida: string,
        valorTotal:number,
        espacio:Espacio
    ){
        this.id = id;
        this.placa = placa;
        this.fechaIngreso = fechaIngreso;
        this.fechaSalida = fechaSalida;
        this.valorTotal = valorTotal;
        this.espacio = espacio;
    }
}
