import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/service/usuario.service';// Reemplaza 'tu_servicio_de_usuarios' con el nombre correcto de tu servicio
import { Usuario } from '../modelo/Usuario';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  nombreUsuario: string = '';
  emailUser: string = '';
  contrasenia: string = '';
  repcontrasenia: string = '';
  userLoged: boolean = false;
  userName: string = '';
  usuario: Usuario = new Usuario();
  email: string='';

  constructor(private userService: UsuarioService) { }


  ngOnInit(): void {
     this.email= localStorage.getItem('emailUserLoged') as string;
     this.obtenerUsuario();
  } 

  onCancel(): void {
    // Restablecer los valores del formulario a los valores originales
    //this.userData = { ...this.originalUserData };
  }

  obtenerUsuario() {
  this.userService.getUsuarioEmail(this.email).subscribe((user: Usuario) => {
      this.usuario= user;
    });
  }
  onSubmit(): void {
    const userId = this.usuario.idUsuario; // Obtener el ID del usuario actual, por ejemplo, desde el token de autenticación ;
    
    if(this.nombreUsuario == ''){
      this.nombreUsuario = this.usuario.nombreUsuario;
    }
    this.usuario.nombreUsuario = this.nombreUsuario;
    if(this.emailUser == ''){
      this.emailUser = this.usuario.email;
    }
    this.usuario.email = this.emailUser;
    if(this.contrasenia == ''){
      this.contrasenia = this.usuario.contrasenia;
    }
    if(this.contrasenia == this.repcontrasenia){
      this.usuario.contrasenia = this.contrasenia;
    }

    this.userService.updateUser(userId, this.usuario).subscribe((response: any) => {
      // Aquí puedes manejar la respuesta del servidor si lo deseas
      console.log('Usuario actualizado con éxito');
      Swal.fire('ACTUALIZACIÓN', 'Usuario actualizado con éxito', 'success');
    });
  }
  editarUsuario() {

  }
  cambiarContrasena() {
  // motrar el nombre del usuario
  /*validateUserLoged() {
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
    }*/
  }
}

