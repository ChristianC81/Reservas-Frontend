import { Component, Input } from '@angular/core';
import { Email } from 'src/app/modelo/Email';
import { Pedido } from 'src/app/modelo/Pedido';
import { SalonDto } from 'src/app/modelo/SalonDto';
import { PublicacionDto } from 'src/app/modelo/dto/PublicacionDto';
import { PedidoService } from 'src/service/pedido.service';
import { ServiLoginRegService } from 'src/service/servi-login-reg.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-reservas',
  templateUrl: './modal-reservas.component.html',
  styleUrls: ['./modal-reservas.component.css']
})
export class ModalReservasComponent {

  @Input() publicacionSelect: PublicacionDto;
  salon: SalonDto | null = null;
  listReservasPen: Pedido[];
  listReservasAcep: Pedido[];
  listReservasCan: Pedido[];
  protected email: Email = new Email();
  constructor(private reservasService: PedidoService, private serEmail: ServiLoginRegService,) { }

  ngOnInit(): void {
    if (this.publicacionSelect == null) {
      this.salon = null;
    } else {
      this.salon = this.publicacionSelect.salonDto;
      this.getReservas();
    }
  }

  getReservas() {
    //obtener la data de reservas para ver en una tabla
    if (null !== this.salon) {
      let emailUserLoged = localStorage.getItem("emailUserLoged")?.toString();
      if (undefined !== emailUserLoged) {
        /* this.reservasService.getPedidosBySalon(this.salon.idSalon, emailUserLoged).subscribe(
           (reservas: Pedido[]) => {
             this.listReservas = reservas;
           }
         )
 */
        this.reservasService.getPedidosBySalonState(this.salon.idSalon, "PENDIENTE",emailUserLoged).subscribe(
          (reservas: Pedido[]) => {
            this.listReservasPen = reservas;
          }
        )

        this.reservasService.getPedidosBySalonState(this.salon.idSalon, "ACEPTADO",emailUserLoged).subscribe(
          (reservas: Pedido[]) => {
            this.listReservasAcep = reservas;
          }
        )

       /* this.reservasService.getPedidosBySalonState(this.salon.idSalon, "RECHAZADO",emailUserLoged).subscribe(
          (reservas: Pedido[]) => {
            this.listReservasCan = reservas;
          }
        )*/

      }
    }
  }

  updateState(ped: Pedido, estate: boolean) {

    this.reservasService.updateStatePedido(ped.pedId, true).subscribe((data) => {
      //si el pedido se confirmo enviar email
      this.email.to = ped.pedEmailUsuario;
      this.email.subject = "Su reserva a sido " + (estate ? "aceptado" : "rechazada");
      if (estate) {
        let detalles = `
        Detalles de reserva
        Fecha de solicitud: ${ped.pedFechaEnvioSolicitud}
        Fecha de inicio: ${ped.pedFechaInicio}
        Fecha de fin: ${ped.pedFechaFin}
        Observaciones:${ped.pedObservacion}
        Estado:${ped.estado}
        `
        this.email.text = detalles;
      }

      this.serEmail.sendStatePedi(this.email).subscribe((data) => {

        if (data) {

          Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Notificación envida correctamente.',
          });
        }

      });

    });

  }
}
