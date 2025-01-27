export class Horario {
  id: number;
  dia: string;
  horaApertura: string; 
  horaCierre: string; 

  constructor(id: number, dia: string, horaApertura: string, horaCierre: string) {
    this.id = id;
    this.dia = dia;
    this.horaApertura = horaApertura;
    this.horaCierre = horaCierre;
  }
}
