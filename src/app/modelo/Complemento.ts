import { GrupoComplemento } from "./GrupoComplemento";
export class Complemento {
    comId: number = 0;
    comNombre: string = "";
    comDescripcion: string = "";
    comCantidadbase: number = 0;
    comCantidadrestante: number = 0;
    comPrecioUnitario: number = 0;
    //relacion al grupo complemento
    grupocomplemento: GrupoComplemento;

    constructor(com_id?: number, com_nombre?: string, com_descripcion?: string, com_cantidadbase?: number, com_cantidad_restante?: number, com_precio_unitario?: number, comgrupo_id?: GrupoComplemento) {
        this.comId = com_id || 0;
        this.comNombre = com_nombre || "";
        this.comDescripcion = com_descripcion || "";
        this.comCantidadbase = com_cantidadbase || 0;
        this.comCantidadrestante = com_cantidad_restante || 0;
        this.comPrecioUnitario = com_precio_unitario || 0;
        this.grupocomplemento = comgrupo_id || new GrupoComplemento;
    }
}

