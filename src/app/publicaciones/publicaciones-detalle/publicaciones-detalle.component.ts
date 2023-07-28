import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { SalonDto } from '../../modelo/dto/SalonDto';
import { Pedido } from '../../modelo/Pedido';
import { UserDto } from '../../modelo/dto/UserDto';
import { PedidoService } from '../../../service/pedido.service';
import { DetallePedidoDto } from 'src/app/modelo/dto/DetallePedidoDto';
import { ComplementoDto } from '../../modelo/dto/ComplementoDto';
import { Toast } from 'ngx-toastr';

import { SalonService } from 'src/service/salon.service';
@Component({
  selector: 'app-publicaciones-detalle',
  templateUrl: './publicaciones-detalle.component.html',
  styleUrls: ['./publicaciones-detalle.component.css']
})
export class PublicacionesDetalleComponent implements OnInit {

  @Input() publicacionSelect: any;
  @Output() close: any = new EventEmitter<boolean>();
  radioValue = true;
  salon: SalonDto;
  modalView = false;
  cantidad = 0;
  preciototal = 0;
  preciototalReserva = 0;
  observacion = '';
  fechainicio = '';
  fechafin = '';
  currenDate = new Date();
  cantidadDetalle: number;
  precioUnitario: number;
  listDetalle :DetallePedidoDto[] = [];
  complementoSelec: ComplementoDto = {} as ComplementoDto;
  codComplement: any = null;
  images: string[] = []; // Aquí debes insertar las imágenes en formato base64

  constructor(private service: PedidoService, private salonService: SalonService) { }

  ngOnInit(): void {
    if(this.publicacionSelect == null){
      this.radioValue = false;
    }else{
      this.salon = this.publicacionSelect.salonDto;
      this.getImages(this.salon.idSalon);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if(!this.radioValue){
          Swal.fire({icon: 'error',
              text: 'Usted no cuenta con información del salon'});
          this.cancel();
      }
    }, 100);
  }

  cancel() {
    this.close.emit(false);
  }

  guardarReserva(){
  const fechaHoy = new Date();
  const fechaInicioReserva = new Date(this.fechainicio);
  const fechaFinReserva = new Date(this.fechafin)
  if ((fechaInicioReserva < fechaHoy)||(fechaFinReserva < fechaHoy)) {
    //Toast.error('No puedes reservar en fechas pasadas a la actual');
    Swal.fire('No puede reservar en fechas anteriores que la actual');
    return;
  }

    var pedido = new Pedido();
    pedido.pedCantidad = 1;
    pedido.pedEstadopago = false;
    pedido.pedObservacion = this.observacion;
    pedido.pedPreciototal = this.preciototal;
    pedido.pedSalon = this.salon.idSalon;
    pedido.pedEmailUsuario = this.publicacionSelect.userDto.email;
    pedido.pedFechaInicio = this.fechainicio;
    pedido.pedFechaFin= this.fechafin;
    pedido.pedDetalle = this.listDetalle;

    this.service.create(pedido).subscribe(data => {
      
        Swal.fire({
          text:'Reserva enviada éxitosamente, el usuario se pondrá en contacto con usted pronto. Gracias por usar nuestro sistema.', 
          icon: 'success'});
        this.cancel();
      
    }, (error: any) => {
      Swal.fire({
        text:'Ocurrió un error al enviar la solicitud de reserva. Intente nuevamente.',
        icon:'error'});
    }
    );
  }

  agregarLista(){
    if (this.cantidadDetalle <= 0) {
      Swal.fire({
        text: 'Cantidad no válida',
        icon: 'warning'
      });
      return;
    }
    if (this.cantidadDetalle > this.complementoSelec.cantidadBase) {
      Swal.fire({
        text: 'La cantidad excede a la cantidad disponible',
        icon: 'warning'
      });
      return;
    }
    var det = new DetallePedidoDto();
    det.idDetalle = 0;
    det.cantidad = this.cantidadDetalle;
    det.idComplemento = this.complementoSelec.idComplemento;
    det.nombreComplemento = this.complementoSelec.nombre;
    det.precioUnitario = this.precioUnitario;
    this.preciototal = this.cantidadDetalle * this.complementoSelec.precioUnitario;
    this.preciototalReserva = this.salon.precioSalon+(this.cantidadDetalle * this.complementoSelec.precioUnitario);
    this.listDetalle.push(det);
  }

  agregarDetalle(detalle: any){
    console.log(detalle.target.value)
    if(detalle.target.value){
      var exist = this.salon.complementos.find((p:ComplementoDto) => p.idComplemento == detalle.target.value);
      if(exist != null ){
        this.complementoSelec = exist;
        this.precioUnitario = exist.precioUnitario;
      }
    }
  }

  validateUserLogedAndShowModalView() {
    var email = localStorage.getItem('emailUserLoged');
    var userName = localStorage.getItem('username') as string;
    console.log("email", email)
    if (
      null !== email &&
      null !== userName &&
      undefined !== email &&
      undefined !== userName &&
      "null" !== email &&
      "null" !== userName 
    ) {
      this.modalView = true;
    } else {
      Swal.fire('Reservas', 'Para reservar un salón debe iniciar sesión.', 'warning');
      this.modalView = false;
    }
  }

  getImages(idSalon: number) {
    this.salonService.getImages(idSalon).subscribe(
      (images: string[]) => {
        this.images = images;
      },
      (error) => {
        console.log('Error al obtener las imágenes', 'error');
        //Swal.fire('Error al obtener las imágenes', 'error');
      }
    );
  }
}
