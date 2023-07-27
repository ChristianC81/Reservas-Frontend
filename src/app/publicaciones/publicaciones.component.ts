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

  images: string[] = []; // Aquí debes insertar las imágenes en formato base64
  publicaciones: PublicacionDto[];
  detalle  = false;
  publicacionSelect :any = null;
  salones: Salon[] = []
  idSalon: number= 1;

  constructor(private salonService: SalonService,private router: Router) { }

  ngOnInit() {
  this.getImages();
  this.getPublicaciones();
  }

  //Listar los nombres de los complementos
  getPublicaciones() {
    this.salonService.getPublicaciones().subscribe(
      (listPublicaciones: PublicacionDto[]) => {
        this.publicaciones = listPublicaciones;
        for (let publicacion of this.publicaciones) {
          this.salonService.getImages(publicacion.salonDto.idSalon).subscribe(
            (images: string[]) => {
              publicacion.images = images;
            },
            (error) => {
              Swal.fire('Error al obtener las imágenes', 'error');
            }
          );
        }
      },
      (error) => {
        Swal.fire('Error al obtener los salones', 'error');
      }
    );
  }
  
getImages() {
  this.salonService.getImages(this.idSalon).subscribe(
    (images: string[]) => {
      this.images = images;
    },
    (error) => {
      Swal.fire('Error al obtener las imágenes', 'error');
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
