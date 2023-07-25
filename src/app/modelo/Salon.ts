import { Calificacion } from "./Calificacion";
import { Complemento } from "./Complemento";
import { Usuario } from "./Usuario";
import { Multimedia } from "./Multimedia";
export class Salon {

  salonId: number = 0;
  salonNombre: string = "";
  salonDireccion: string = "";
  salonCapacidad: number = 0;
  salonDisponibilidad: boolean = true;
  salonDescripcion: string = "";
  salonCategoria: string = "";
  salonFoto: string = "";
  salonLongitud: number = 0;
  salonLatitud: number = 0;
  salonPrecio: number = 0;
  salonEstado: string = "";
  
   // Representa la relación @OneToMany con Multimedia
   multimediaBySalon: Multimedia[] = [];

  //
  calId: Calificacion;
  comId: Complemento;
  usuId: Usuario;


  constructor(salon_id?: number, salon_nombre?: string, salon_direccion?: string, salon_capacidad?: number, salon_disponibilidad?: boolean, salon_descripcion?: string, salon_categoria?: string, salon_foto?: string, salon_longitud?: number, salon_latitud?: number, salon_precio?: number, salon_estado?: boolean, usu_id?: Usuario, cal_id?: Calificacion, com_id?: Complemento) {
    this.salonId = salon_id || 0;
    this.salonNombre = salon_nombre || "";
    this.salonDireccion = salon_direccion || "";
    this.salonCapacidad = salon_capacidad || 0;
    this.salonDisponibilidad = salon_disponibilidad || true;
    this.salonDescripcion = salon_descripcion || "";
    this.salonCategoria = salon_categoria || "";
    this.salonFoto = salon_foto || "";
    this.salonLongitud = salon_longitud || 0;
    this.salonLatitud = salon_latitud || 0;
    this.salonPrecio = salon_precio || 0;
    this.salonEstado =  salon_estado ? "true" : "false";
    this.usuId = usu_id || new Usuario;
    this.calId = cal_id || new Calificacion;
    this.comId = com_id || new Complemento;
  }

}
 