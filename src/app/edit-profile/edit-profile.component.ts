import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/service/usuario.service';// Reemplaza 'tu_servicio_de_usuarios' con el nombre correcto de tu servicio
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userData: any = {};
  originalUserData: any = {};
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
    this.userService.updateUser(userId, this.userData).subscribe((response: any) => {
      // Aquí puedes manejar la respuesta del servidor si lo deseas
      console.log('Usuario actualizado con éxito');
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

