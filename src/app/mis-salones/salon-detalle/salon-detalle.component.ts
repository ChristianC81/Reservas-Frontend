import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SalonDto } from 'src/app/modelo/SalonDto';
import Swal from 'sweetalert2';
import { SalonService } from 'src/service/salon.service';
@Component({
  selector: 'app-salon-detalle',
  templateUrl: './salon-detalle.component.html',
  styleUrls: ['./salon-detalle.component.css'],
})
export class SalonDetalleComponent {
  @Input() publicacionSelect: any;
  @Output() close: any = new EventEmitter<boolean>();
  radioValue = true;
  salon: SalonDto;
  currenDate = new Date();
  showReservas = false;
  images: string[] = []; // Aquí debes insertar las imágenes en formato base64

  constructor(private salonService: SalonService) {}

  ngOnInit(): void {
    if (this.publicacionSelect == null) {
      this.radioValue = false;
    } else {
      this.salon = this.publicacionSelect.salonDto;
      this.getImages(this.salon.idSalon);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.radioValue) {
        Swal.fire({
          icon: 'error',
          text: 'Usted no cuenta con información del salon',
        });
        this.cancel();
      }
    }, 100);
  }

  cancel() {
    this.close.emit(false);
  }

  verReservas() {
    //obtener la data de reservas para ver en una tabla
    this.showReservas = true;
  }

  getImages(idSalon: number) {
    this.salonService.getImages(idSalon).subscribe(
      (images: string[]) => {
        this.images = images;
      },
      (error) => {
        Swal.fire('Error al obtener las imágenes', 'error');
      }
    );
  }
}
