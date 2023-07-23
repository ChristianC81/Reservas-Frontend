import { Rol } from "./Rol";
import { Persona } from "./Persona";

export class Usuario {
    idUsuario: number;
    nombreUsuario: string;
    contrasenia: string;
    estado: boolean;
    email: string;

    //mando a la persona con su el mismo nombre de la base
    persona: Persona;
    rol: Rol;
     
   constructor(idUsuario?: number, nombreUsuario?: string, contrasenia?: string, estado?: boolean, email?: string, usu_rol?: Rol, pers_id?: Persona) {
        this.idUsuario = idUsuario || 0;
        this.nombreUsuario = nombreUsuario || "";
        this.contrasenia = contrasenia || "";
        this.estado = estado ? true : false;
        this.email = email || "",
        this.rol = usu_rol || new Rol;
        this.persona = pers_id || new Persona;
    }
}
