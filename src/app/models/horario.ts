export class Horario {
  id: number;
  dia?: string | null;
  fechaEspecial:Date | null
  horaApertura: string; 
  horaCierre: string; 
  tipoHorario:string

  constructor(id: number, dia: string | null, fechaEspecial:Date | null,horaApertura: string, horaCierre: string,tipoHorario:string) {
    this.id = id;
    this.dia = dia;
    this.fechaEspecial = fechaEspecial
    this.horaApertura = horaApertura;
    this.horaCierre = horaCierre;
    this.tipoHorario = tipoHorario
  }
}
