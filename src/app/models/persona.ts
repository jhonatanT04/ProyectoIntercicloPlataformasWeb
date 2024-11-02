import { User } from "./user";

export class Persona extends User{
    nombre: string;
    apellido: string;
    numeroTelefonico: string;
    direccion: string;
    codigo: string;
    pais: string;
    ciudad: string;
    rolAdministrativo: boolean;

    constructor(
        correo:string,
        password:string,
        nombre:string,
        apellido:string,
        numeroTelefonico:string,
        direccion:string,
        codigo:string,
        pais:string,
        ciudad:string,
        rolAdministrativo=true
    ){
        super(correo,password);
        this.nombre = nombre;
        this.apellido = apellido;
        this.numeroTelefonico = numeroTelefonico;
        this.direccion = direccion;
        this.codigo = codigo;
        this.pais = pais;
        this.ciudad = ciudad;
        this.rolAdministrativo = rolAdministrativo;
    }
}
