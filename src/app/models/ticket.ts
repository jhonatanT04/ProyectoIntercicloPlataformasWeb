import { Espacio } from "./espacio";
import { Persona } from "./persona";

export class Ticket {
    id: number;
    placa: string;
    fechaIngreso: string;
    fechaSalida: string;
    valorTotal: number;
    usuario:Persona;
    espacio:Espacio
    constructor(
        id: number,
        placa: string,
        fechaIngreso: string,
        fechaSalida: string,
        valorTotal:number,
        espacio:Espacio,
        usuario:Persona
    ){
        this.id = id;
        this.placa = placa;
        this.fechaIngreso = fechaIngreso;
        this.fechaSalida = fechaSalida;
        this.valorTotal = valorTotal;
        this.espacio = espacio;
        this.usuario = usuario;
    }


    
}
