import { Contrato } from "./contrato";
import { User } from "./user";

export class Persona extends User{
    id:number
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    cedula: string;
    rol: boolean;
    listaContratos?:Contrato

    constructor(
        id:number,
        email:string,
        password:string,
        nombre:string,
        apellido:string,
        telefono:string,
        direccion:string,
        cedula:string,
        rol=false,
        listaContratos?:Contrato
    ){
        super(email,password);
        this.id = id
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.direccion = direccion;
        this.cedula = cedula;
        this.rol = rol;
        this.listaContratos = listaContratos
    }
}
