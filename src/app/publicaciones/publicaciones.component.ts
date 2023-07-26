import { Component } from '@angular/core';
import { SalonService } from 'src/service/salon.service';
import { Salon } from '../modelo/Salon';
import { PublicacionDto } from '../modelo/dto/PublicacionDto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent {

  publicaciones: PublicacionDto[];
  detalle  = false;
  publicacionSelect :any = null;
  salones: Salon[] = []

  constructor(private salonService: SalonService,private router: Router) { }

  ngOnInit() {
 
    this.getPublicaciones();
  }

  //Listar los nombres de los complementos
  getPublicaciones() {
    this.salonService.getPublicaciones().subscribe(
      (listPublicaciones: PublicacionDto[]) => {
        this.publicaciones = listPublicaciones;
        
      },
      (error) => {
        Swal.fire('Error al obtener los salones', 'error');
      }
    );
  }

  seleccionarPublicacion(data: any){
    if(data){
      this.publicacionSelect = data;
      this.detalle = true;
    }
  }

  close(event:any){
    this.detalle = event;
    this.publicacionSelect = null;
  }
}
