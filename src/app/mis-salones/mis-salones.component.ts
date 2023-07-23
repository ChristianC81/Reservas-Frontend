import { Component, Input } from '@angular/core';
import { PublicacionDto } from '../modelo/dto/PublicacionDto';
import { SalonService } from 'src/service/salon.service';

@Component({
  selector: 'app-mis-salones',
  templateUrl: './mis-salones.component.html',
  styleUrls: ['./mis-salones.component.css']
})
export class MisSalonesComponent {

  publicaciones: PublicacionDto[];
  detalle  = false;
  publicacionSelect :any = null;

  constructor(private salonService: SalonService) { }

  ngOnInit() {
    this.getPublicacionesByUser();
  }

  //Listar los nombres de los complementos
  getPublicacionesByUser() {
    let email = localStorage.getItem("emailUserLoged") as string;
    this.salonService.getPublicacionesByUsuario(email).subscribe(
      (listPublicaciones: PublicacionDto[]) => {
        this.publicaciones = listPublicaciones;
      },
      (error) => {
        console.error(
          'Error al obtener los nombres de los complementos:',
          error
        );
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
