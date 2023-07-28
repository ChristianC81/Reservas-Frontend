import { Component, ElementRef, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title: string = 'Reservas Cuenca Company';
  fecha: Date = new Date();
  fechanw = getDiaSemana(this.fecha);
  userLoged: boolean = false;
  userName: string = '';
  showMenu: boolean = false;

  constructor(private authService: AuthService, private router: Router,) { }
  //iniciarlizar variables para un header responsive
  @ViewChild('toggle_button')toggle_button:ElementRef;
  @ViewChild('navbar_links')navbar_links:ElementRef;
  


  async ngOnInit() {
    this.validateUserLoged();
  }
//acciones para hacer responsive el nabvar
  ngAfterViewInit() {
    this.toggle_button.nativeElement.addEventListener('click',()=>{

      this.navbar_links.nativeElement.classList.toggle('active');
    });

  }

  elementoHabilitado(): boolean {
    return this.authService.esAdmin() && this.authService.esVendedor();
  }
  elementoOculto(): boolean {
    return this.authService.esVendedor();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  validateUserLoged() {
    var email = localStorage.getItem('emailUserLoged');
    this.userName = localStorage.getItem('username') as string;
    console.log("email", email)
    if (
      null !== email &&
      null !== this.userName &&
      undefined !== email &&
      undefined !== this.userName &&
      "null" !== email &&
      "null" !== this.userName 
    ) {
      this.userLoged = true;
    } else {
      this.userLoged = false;
    }
  }


  validateUserLogedAndRedirect() {
    if(this.userLoged){
      this.router.navigate(['/salon/publicar'])
    } else {
      Swal.fire('Publicar salón', 'Para publicar un salón debes iniciar sesión.', 'warning');
    }
  }

  logout() {
    localStorage.removeItem('emailUserLoged');
    localStorage.removeItem('username');
    localStorage.removeItem('emailUserLogedAd');
    this.userLoged=false;
    this.router.navigate(['/']);
  }
}
function getDiaSemana(date: Date) {
  let days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];
  const dia = days[date.getDay()];
  //hola

  const numdia = formatDate(date, 'dd', 'en-US');
  const mes = getMes(date);
  const anio = formatDate(date, 'YYYY', 'en-US');
  return dia + ', ' + numdia + ' de ' + mes + ' del ' + anio;
}

function getMes(date: Date) {
  let meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const mes = meses[date.getMonth()];
  return mes;
  
}


