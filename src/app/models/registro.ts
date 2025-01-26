export class Registro {
    placa: string;          // Placa del vehículo
    fechaIngreso: Date;     // Fecha y hora de ingreso
    fechaSalida?: Date;     // Fecha y hora de salida (opcional)

    constructor(placa:string,fechaIngreso:Date,fechaSalida:Date){
        this.placa = placa
        this.fechaIngreso = fechaIngreso
        this.fechaSalida = fechaSalida
    }
  }
  