import { Component, Input } from '@angular/core';
import { PublicacionDto } from '../modelo/dto/PublicacionDto';
import { SalonService } from 'src/service/salon.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Salon } from '../modelo/Salon';

@Component({
  selector: 'app-mis-salones',
  templateUrl: './mis-salones.component.html',
  styleUrls: ['./mis-salones.component.css']
})
export class MisSalonesComponent {

  publicaciones: PublicacionDto[];
  detalle  = false;
  publicacionSelect :any = null;
  salones: Salon[] = []

  constructor(private salonService: SalonService,private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('username')){
      this.router.navigate(['loginReg']);
    }
    this.getPublicacionesByUser();
  }

  eliminarSalon(salonId: number) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este Salón?',
      text: "No podras revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4361ee',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
        this.salonService.eliminarSalon(salonId).subscribe(
          salones => {
            this.salonService.getPublicaciones().subscribe(
              response => this.salones = response
            )
            Swal.fire(
              'Eliminado!',
              'El Salón ha sido eliminado con exito'
            )
          })
      }
    })
  }

  //Listar los nombres de los complementos
  getPublicacionesByUser() {
    let email = localStorage.getItem("emailUserLoged") as string;
    this.salonService.getPublicacionesByUsuario(email).subscribe(
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