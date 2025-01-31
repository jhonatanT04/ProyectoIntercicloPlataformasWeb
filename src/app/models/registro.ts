export class Registro {
    id:number
    placa: string;          // Placa del vehículo
    fechaIngreso: Date;     // Fecha y hora de ingreso
    fechaSalida?: Date | null;     // Fecha y hora de salida (opcional)

    constructor(id:number,placa:string,fechaIngreso:Date,fechaSalida?:Date | null){
        this.id = id
        this.placa = placa
        this.fechaIngreso = fechaIngreso
        this.fechaSalida = fechaSalida
    }
  }
  