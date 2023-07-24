import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelo/Usuario';
import { UsuarioService } from 'src/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminusuario',
  templateUrl: './adminusuario.component.html',
  styleUrls: ['./adminusuario.component.css']
})

export class AdminusuarioComponent implements OnInit {
  //Variable para el filtro de busqueda
  searchText: string = '';

  //Variables para mostrar la cantidad de usuarios
  totUsuarios: number;
  usuActivos: number;
  usuInactivos: number;


  usuarios: Usuario[] = [];
  usuariosActivos: Usuario[] = [];
  usuariosInactivos: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
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

    this.usuarioService.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      }
    );
  }

  //Metodo para desactivar el usuario
  desactivarUsuario(usu: Usuario) {
    usu.estado = false;
    this.usuarioService.getUpdateEstado(usu.idUsuario, usu).subscribe(
      data => {
        Swal.fire('Administración', 'Usuario Desactivado', 'info').then(() => {
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

  //Metodo para activar el usuario
  activarUsuario(usu: Usuario) {
    usu.estado = true;
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
  
  searchUsuarios() {
    if (this.searchText.trim() !== '') {
      this.usuarios = this.usuarios.filter(usuario =>
        usuario.nombreUsuario.toLowerCase().includes(this.searchText.toLowerCase()) ||
        // usuario.persona.persEmail.toLowerCase().includes(this.searchText.toLowerCase()) ||
        usuario.rol.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.usuarioService.getUsuarios().subscribe(
        usuarios => {
          this.usuarios = usuarios;
        }
      );
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
