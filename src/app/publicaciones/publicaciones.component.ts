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

  images: string[] = []; 
  publicaciones: PublicacionDto[];
  detalle = false;
  publicacionSelect: any = null;
  salones: Salon[] = [];
  idSalon: number = 1;
  categoriaBusqueda: string;
  salonesFiltrados: any[] = [];


  constructor(private salonService: SalonService, private router: Router) { }

  ngOnInit() {
    this.getImages();
    this.getPublicaciones();
  }

  getSalonxCategoria() {
    console.log("Evento ngSubmit activado");
    if (!this.categoriaBusqueda || this.categoriaBusqueda.trim() === '') {
      console.log('Ingresa una categoría válida antes de hacer la búsqueda.');
      return;
    }
  
    this.salonService.getSalonxCat(this.categoriaBusqueda).subscribe(
      (salones: any[]) => {
        console.log(this.categoriaBusqueda);
        this.salonesFiltrados = [];
  
        // Obtener las imágenes de las publicaciones asociadas a cada salón
        for (let salon of salones) {
          this.salonService.getImages(salon.idSalon).subscribe(
            (images: string[]) => {
              this.salonesFiltrados.push({
                salonDto: salon,
                userDto: null,
                multimedia: null,
                images: images
              });
            },
            (error) => {
              console.log(error,'Error al obtener las imágenes');
            }
          );
        }
  
        console.log("Resultado de la búsqueda:", this.salonesFiltrados);
      },
      (error) => {
        console.log('Error al obtener los salones', error);
      }
    );
  }
  
  

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
                 console.log(error,'Error al obtener las imágenes');
            }
          );
        }
      },
      (error) => {
        console.log('Error al obtener los salones', error);
      }
    );
  }

  mostrarTodosLosCards(): boolean {
    return this.categoriaBusqueda === '' || this.salonesFiltrados.length === 0;
  }
  
  getImages() {
    this.salonService.getImages(this.idSalon).subscribe(
      (images: string[]) => {
        this.images = images;
      },
      (error) => {
        console.log(error,'Error al obtener las imágenes');
      }
    );
  }
  seleccionarPublicacion(data: any) {
    if (data) {
      this.publicacionSelect = data;
      this.detalle = true;
    }
  }

  close(event: any) {
    this.detalle = event;
    this.publicacionSelect = null;
  }
}
