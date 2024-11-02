import { User } from "./user";

export class Persona extends User{
    constructor(correo:string,password:string,
        nombre:string,
        apellido:string,
        numeroTelefonico:string,
        direccion:string,
        codigo:number,
        pais:string,
        ciudad:string
    ){
        super(correo,password)
    }
}
