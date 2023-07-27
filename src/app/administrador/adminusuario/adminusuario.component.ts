import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelo/Usuario';
import { UsuarioService } from 'src/service/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-adminusuario',
  templateUrl: './adminusuario.component.html',
  styleUrls: ['./adminusuario.component.css']
})

export class AdminusuarioComponent implements OnInit {
  //Variable para el filtro de busqueda
  searchTextInc: string = '';
  searchTextAct: string = '';

  //Variables para mostrar la cantidad de usuarios
  totUsuarios: number;
  usuActivos: number;
  usuInactivos: number;


  usuarios: Usuario[] = [];
  usuariosActivos: Usuario[] = [];
  usuariosInactivos: Usuario[] = [];
  usuariosActivosCop: Usuario[] = [];
  usuariosInactivosCop: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) { }
  userLoged: boolean = false;
  

  logout() {
 
    localStorage.removeItem('emailUserLoged');
    localStorage.removeItem('username');
    localStorage.removeItem('emailUserLogedAd');
    this.userLoged=false;
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    //mostrar contador de usuarios
    this.cargarUsuNum();
    this.cargarUsuEst();
  }

  //cargar los usuario activos y inactivos diferentes de administradores

  private cargarUsuNum() {
    let obsUsuActivos = this.usuarioService.getNumUsu(true);
    let obsUsuInactivos = this.usuarioService.getNumUsu(false);

    forkJoin([obsUsuActivos, obsUsuInactivos]).subscribe(

      ([usuActivos, usuInactivos]) => {

        this.usuActivos = usuActivos;
        this.usuInactivos = usuInactivos;
        this.totUsuarios = this.usuActivos + this.usuInactivos;
      },
      error => {
        console.log(error);
      });
  }

  //cargo los datos como nombre gmail etc 
  private cargarUsuEst() {
    this.usuarioService.getUsuEstado(true).subscribe(data => {

      this.usuariosActivos = data;
      this.usuariosActivosCop=data;
    });


    this.usuarioService.getUsuEstado(false).subscribe(data => {

      this.usuariosInactivos = data;
      this.usuariosInactivosCop=data;
    });
  }

  //cambio el estado de los usuarios
  actiDesacUsu(estado: boolean, usu: Usuario) {

    usu.estado = estado;
    usu.contrasenia = "";
    this.usuarioService.userUpdateState(usu).subscribe(data => {

      if (data.idUsuario != null) {
        window.location.reload();
      }

    });
  }





  searchUsuariosInc(arrayUsu: Usuario[]) {
 

    if (this.searchTextInc.trim() !== '') {
      this.usuariosInactivos=this.usuariosInactivosCop.filter(usuario =>
        usuario.nombreUsuario.toLowerCase().includes(this.searchTextInc.toLowerCase())
        // usuario.persona.persEmail.toLowerCase().includes(this.searchText.toLowerCase()) ||

      );
    } else {
    
      this.usuariosInactivos=this.usuariosInactivosCop.slice();
    
    }
  }

  searchUsuariosAct(arrayUsu: Usuario[]) {
 

    if (this.searchTextAct.trim() !== '') {
      this.usuariosActivos=this.usuariosActivosCop.filter(usuario =>
        usuario.nombreUsuario.toLowerCase().includes(this.searchTextAct.toLowerCase())
        // usuario.persona.persEmail.toLowerCase().includes(this.searchText.toLowerCase()) ||

      );
    } else {
    
      this.usuariosActivos=this.usuariosActivosCop.slice();
    
    }
  }

  estadoSt(estado: boolean): string {
    if (estado) {
      return 'Activo';
    } else {
      return 'Inactivo';
    }
  }

}
