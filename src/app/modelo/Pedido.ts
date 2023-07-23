import { DetallePedidoDto } from "./dto/DetallePedidoDto";

export class Pedido{
    pedId: number = 0;
    pedCantidad: number= 0;
    pedPreciocomplementos: number =0;
    pedPreciototal: number = 0;
    pedObservacion:string = "";
    pedEstadopago: boolean;
    pedFechaInicio: string = "";
    pedFechaFin: string = "";
    pedFechaEnvioSolicitud: string = "";
    estado: string = "";
    //RELACIONES
    pedEmailUsuario: string;
    pedSalon: number;
    pedDetalle:DetallePedidoDto[] = [];
    //id_detalle: Detalle;
}