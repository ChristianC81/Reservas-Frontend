import { Component, OnInit } from '@angular/core';
import { Salon } from '../modelo/Salon';
import { SalonService } from '../../service/salon.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Complemento } from '../modelo/Complemento';
import { ComplementoService } from '../../service/complemento.service';
import { GrupocomplementoService } from '../../service/grupocomplemento.service';
import { SalonDto } from '../modelo/SalonDto';
import { CategoriaDto } from '../modelo/CategoriaDto';
import { ComplementoDto } from '../modelo/dto/ComplementoDto';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponentPubli implements OnInit {


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

  public salon: Salon = new Salon();
  complemento: Complemento = new Complemento();
  public titulo: string = 'Publica tu Salón AHORA !!';
  ultimoId: number;
  idSalonComp: number;

  ListaCategoria: CategoriaDto[] = [];

  constructor(
    private salonService: SalonService,
    private router: Router,
    private complementoService: ComplementoService,
    private grupocomplementoService: GrupocomplementoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.SalonDto.categoria = {} as CategoriaDto;
    this.SalonDto.complementos = [];
  }

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.router.navigate(['loginReg']);
    }
    this.cargarSalon();
    this.ListCategoria();
  }

  //Listar los nombres de los complementos
  ListarNombresComplementos() {
    this.complementoService.ListarNombresComplementos().subscribe(
      (nombre: string[]) => {
        console.log('Nombres de Complementos:', nombre);
      },
      (error) => {
        console.error(
          'Error al obtener los nombres de los complementos:',
          error
        );
      }
    );
  }
  ListCategoria() {
    this.salonService
      .getCategoria()
      .subscribe((categoria: CategoriaDto[]) => (this.ListaCategoria = categoria));
  }

  // Imagenes
  selectedImages: string[] = [];
  selectedImage: File[] = [];

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    this.readImages(files);
    this.selectedImage = Array.from(files);
  }

  readImages(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImages.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
      console.log(reader);
    }
  }

  parseBytes(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileAsArrayBuffer = e.target.result; // Aquí tienes el archivo como ArrayBuffer (bytes).
        this.selectedImages.push(fileAsArrayBuffer);
      };
      reader.readAsArrayBuffer(files[i]);
    }
  }

  ventanaEmergenteVisible: boolean = false;

  mostrarVentanaEmergente() {
    this.ventanaEmergenteVisible = true;
  }

  ocultarVentanaEmergente() {
    this.ventanaEmergenteVisible = false;
  }

  cargarSalon(): void {
    this.activatedRoute.params.subscribe((params) => {
      let salonId = params['salonId'];
      if (salonId) {
        this.salonService
          .getSalon(salonId)
          .subscribe((salon) => (this.salon = salon));
      }
    });
  }

  public create(): void {
     // Verificar si se ha seleccionado alguna imagen
  if (this.selectedImage.length === 0) {
    Swal.fire(
      'Error',
      'Debe subir al menos una imagen antes de publicar.',
      'error'
    );
    return;
  }

    console.log(this.SalonDto);
    this.SalonDto.categoria = this.ListaCategoria.find(
      (categoria) => categoria?.categoria == this.SalonDto.categoria?.categoria
    ) as CategoriaDto;
    this.salonService
      .createSalon(
        this.SalonDto,
        localStorage.getItem('emailUserLoged') as string
      )
      .subscribe((salon) => {
        Swal.fire(
          'Datos del Salón Guardado',
          `Salon ${salon.nombre} guardado con exito`,
          'success'
        );
        this.idSalonComp = salon.idSalon;
        this.createImageSalon(this.idSalonComp); // Mover esta línea aquí
      }, (err) => {
        Swal.fire(
          'Publicación de salón',
          err.error,
          'error'
        );
      }
      );
      //this.router.navigate(['/mis-salones']);
  }
  

  createImageSalon(idSalon: number): void {
    if (idSalon === undefined) {
      Swal.fire(
        'Error',
        'No se pudo subir la imagen porque el ID del salón no se ha definido correctamente.',
        'error'
      );
      return;
    }
  
    this.salonService
      .postImage(this.selectedImage, this.idSalonComp)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  
  //creacion del complemento
  public createcomplemento(): void {
    // agregamos el complemto al array de complementos
    var complemento = {
      idComplemento: this.complementoDto.idComplemento,
      nombre: this.complementoDto.nombre,
      descripcion: this.complementoDto.descripcion,
      cantidadBase: this.complementoDto.cantidadBase,
      cantidadRestante: this.complementoDto.cantidadRestante,
      precioUnitario: this.complementoDto.precioUnitario,
      estado: this.complementoDto.estado,
    }
    this.SalonDto.complementos.push(complemento);
    Swal.fire(
      'Datos de Complemento Agregado',
      `Complemento guardado con exito`,
      'success'
    );
  }

  mostrarDatos() {
    this.complementoService.ListarNombresComplementos().subscribe(
      (nombres: string[]) => {
        const cuadroTexto = document.getElementById(
          'miCuadroDeTexto'
        ) as HTMLInputElement;
        cuadroTexto.value = nombres.join(', ');
      },
      (error) => {
        console.error(
          'Error al obtener los nombres de los complementos:',
          error
        );
      }
    );
  }
}
