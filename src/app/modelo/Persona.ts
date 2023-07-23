export class Persona {

  idPersona: number = 0;
  dniPasaporte: string = "";
  nombre: string = "";
  apellido: string = "";
  telefono: string = "";
  celular: string = "";
  fechaNac: Date;


  constructor(idPersona?: number, dniPasaporte?: string, nombre?: string, apellido?: string, telefono?: string, celular?: string, fechaNac?: Date) {
    this.idPersona = idPersona || 0;
    this.dniPasaporte = dniPasaporte || "";
    this.nombre = nombre || "";
    this.apellido = apellido || "";
    this.telefono = telefono || "";
    this.celular = celular || "";
    this.fechaNac = fechaNac|| new Date;
  }

}
