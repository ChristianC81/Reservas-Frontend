export class Rol{
    idRol:number=0;
    nombre:string="";
    descripcion:string="";

    constructor(idRol?: number, nombre?: string, descripcion?: string) {
        this.idRol = idRol || 0;
        this.nombre = nombre || "";
        this.descripcion = descripcion || "";
    }

}