import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/modelo/Pedido';
import { SalonDto } from 'src/app/modelo/SalonDto';
import { PublicacionDto } from 'src/app/modelo/dto/PublicacionDto';
import { PedidoService } from 'src/service/pedido.service';

@Component({
  selector: 'app-modal-reservas',
  templateUrl: './modal-reservas.component.html',
  styleUrls: ['./modal-reservas.component.css']
})
export class ModalReservasComponent {

  @Input() publicacionSelect: PublicacionDto;
  salon: SalonDto | null = null;
  listReservas: Pedido[];

  constructor(private reservasService: PedidoService) { }

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
        this.reservasService.getPedidosBySalon(this.salon.idSalon, emailUserLoged).subscribe(
          (reservas: Pedido[]) => {
            this.listReservas = reservas;
          }
        )
      }
    }
  }

  updateState(ped: Pedido, estate:boolean) {
   
    this.reservasService.updateStatePedido(ped.pedId,true).subscribe((data) => {
        //si el pedido se confirmo enviar email
        

    });

  }
}
