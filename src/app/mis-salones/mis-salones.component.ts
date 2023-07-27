import { Component, Input, OnInit } from '@angular/core';
import { PublicacionDto } from '../modelo/dto/PublicacionDto';
import { SalonService } from 'src/service/salon.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Salon } from '../modelo/Salon';
import { SalonDto } from '../modelo/SalonDto';
import { CategoriaDto } from '../modelo/CategoriaDto';
import { ComplementoDto } from '../modelo/dto/ComplementoDto';
@Component({
  selector: 'app-mis-salones',
  templateUrl: './mis-salones.component.html',
  styleUrls: ['./mis-salones.component.css']
})
export class MisSalonesComponent {

  SalonDto: SalonDto = {
    idSalon: 0,
    nombre: '',
    direccion: '',
    capacidad: 0,
    disponibilidad: false,
    descripcion: '',
    precioSalon: 0,
    calificacion: 0,
    estado: false,
    garantiaDanos: 0,
    complementos: [],
    categoria: new CategoriaDto(),
  };

  CategoriaDto: CategoriaDto = {
    idCategoria: 0,
    categoria: '',
    estado: true,
  };

  complementoDto: ComplementoDto = {
    idComplemento: 0,
    nombre: '',
    descripcion: '',
    cantidadBase: 0,
    cantidadRestante: 0,
    precioUnitario: 0,
    estado: true,
  };

  publicaciones: PublicacionDto[];
  detalle = false;
  publicacionSelect: any = null;
  salones: Salon[] = []

  idSalonComp: number;
  ListaCategoria: CategoriaDto[] = [];

  constructor(private salonService: SalonService, private router: Router) {
    this.SalonDto.categoria = {} as CategoriaDto
  }

  ngOnInit() {
    if (!localStorage.getItem('username')) {
      this.router.navigate(['loginReg']);
    }
    this.getPublicacionesByUser();
  }

  editarSalon() {
      this.router.navigate(['/salon/editar'])
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

  ventanaEmergenteVisible: boolean = false;

  mostrarVentanaEmergente() {
    this.ventanaEmergenteVisible = true;
  }

  ocultarVentanaEmergente() {
    this.ventanaEmergenteVisible = false;
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