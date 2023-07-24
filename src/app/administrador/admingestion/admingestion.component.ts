import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import { UsuarioService } from 'src/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admingestion',
  templateUrl: './admingestion.component.html',
  styleUrls: ['./admingestion.component.css']
})
export class AdmingestionComponent {

  //Variables para mostrar la cantidad de usuarios
  totUsuarios: number;
  usuActivos: number;
  usuInactivos: number;


  usuariosActivos: Usuario[] = [];
  usuariosInactivos: Usuario[] = [];

  constructor(private usuarioService: UsuarioService,private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('username')){
      this.router.navigate(['loginReg']);
    }
    this.usuarioService.getUsuariosActivos().subscribe(
      usuarios => {
        this.usuariosActivos = usuarios;
        this.usuActivos = this.usuariosActivos.length; // Asignar la cantidad de usuarios activos
        this.totUsuarios = this.usuActivos + this.usuInactivos; // Actualizar la cantidad total de usuarios
      }
    );
        
    this.usuarioService.getUsuariosInactivos().subscribe(
      usuarios => {
        this.usuariosInactivos = usuarios;
        this.usuInactivos = this.usuariosInactivos.length; // Asignar la cantidad de usuarios inactivos
        this.totUsuarios = this.usuActivos + this.usuInactivos; // Actualizar la cantidad total de usuarios
      }
    );
    
   
  }
  //Metodo para activar el usuario
  cambiarRol(usu: Usuario) {
    
    this.usuarioService.getUpdateEstado(usu.idUsuario, usu).subscribe(
      data => {
        Swal.fire('Administración', 'Usuario Activo', 'success').then(() => {
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
  editarUsuario(usu: Usuario) {
  }
  eliminarUsuario(usu: Usuario) {
  }
}
