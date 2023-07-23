import { Component, OnInit } from '@angular/core';
import { Salon } from 'src/app/modelo/Salon';
import { SalonService } from 'src/service/salon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminpublicacion',
  templateUrl: './adminpublicacion.component.html',
  styleUrls: ['./adminpublicacion.component.css']
})
export class AdminpublicacionComponent implements OnInit {

  salonesActivos: Salon[] = [];
  salonesInactivos: Salon[] = [];

  constructor(private salonService: SalonService) { }
  
  ngOnInit(): void {
    this.salonService.getSalonesActivos().subscribe(
      salones => this.salonesActivos = salones
    );

    this.salonService.getSalonesInactivos().subscribe(
      salones => this.salonesInactivos = salones
    );
  }

   //Metodo para desactivar un salon
  desactivarSalon(sal: Salon) {
    sal.salonEstado = "Inactivo";
    this.salonService.getUpdateEstado(sal.salonId, sal).subscribe(
      data => {
        Swal.fire('Administración', 'Salón Desactivado', 'info').then(() => {
          // Recargar la página después de mostrar el mensaje
          setTimeout(function() {
            // Recargar la página
            location.reload();
          }, 2);
        });
      },
      error => {
        console.log(error);
        // Manejar el error de forma adecuada
      }
    );
  }

  //Metodo para activar un salon
  activarSalon(sal: Salon) {
    sal.salonEstado = "Activo";
    this.salonService.getUpdateEstado(sal.salonId, sal).subscribe(
      data => {
        Swal.fire('Administración', 'Salón Activado', 'success').then(() => {
          // Recargar la página después de mostrar el mensaje
          setTimeout(function() {
            // Recargar la página
            location.reload();
          }, 2);
        });
      },
      error => {
        console.log(error);
        // Manejar el error de forma adecuada
      }
    );
  }

  //Metodo para identificar la disponiblidad del salon
  disponibilidad(sal: Salon) {
    if (sal.salonDisponibilidad == true) {
      return "Disponible";
    } else {
      return "No Disponible";
    }
  }
}
