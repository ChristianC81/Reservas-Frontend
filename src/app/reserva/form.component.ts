import { Component } from '@angular/core';
import { Pedido } from '../modelo/Pedido';
import { PedidoService } from '../../service/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponentPedido {
  public pedido: Pedido = new Pedido()
  public titulo:string = "Solicita tu reserva";

  constructor(private pedidoService: PedidoService, private router: Router,
    private activatedRoute: ActivatedRoute){ }
  
  ngOnInit(): void {
    this.cargarPedido()
  }

  cargarPedido(): void{
    this.activatedRoute.params.subscribe(params =>{
      let pedId = params['pedId']
      if(pedId){
        this.pedidoService.getProducto(pedId).subscribe((pedido) =>this.pedido=pedido)
      }
    })
  }

  public create():void{
    this.pedidoService.create(this.pedido).subscribe(
      pedido => {this.router.navigate(['/pedido']);

      Swal.fire('Solicitud de Reserva realizada', 'success');
    }
    )
  }
}
