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

  constructor(private userService: UsuarioService) { }

  ngOnInit(): void {
    // Obtener el ID del usuario desde el LocalStorage
    const userId = Number(localStorage.getItem('userId'));

    // Obtener los datos del usuario desde el servidor
    this.userService.getUsuario(userId).subscribe((user: Usuario) => {
      this.userData = { ...user };
      this.originalUserData = { ...user };
    });
    // Lógica para obtener los datos del usuario actual y cargarlos en el formulario
    /*const userId = 1  //Obtener el ID del usuario actual, por ejemplo, desde el token de autenticación ;
    this.userService.getUserById(userId).subscribe((user: any) => {
      this.userData = { ...user };
      this.originalUserData = { ...user };
    });*/
  }

  onSubmit(): void {
    /* const modifiedFields: any = {};

    // Identificar los campos modificados
    for (const key in this.userData) {
      if (this.userData[key] !== this.originalUserData[key]) {
        modifiedFields[key] = this.userData[key];
      }
    }

   if (Object.keys(modifiedFields).length === 0) {
      console.log('No se han realizado cambios');
      return;
    }

    // Lógica para enviar solo los campos modificados al backend
    const userId = 1 // Obtener el ID del usuario actual, por ejemplo, desde el token de autenticación ;
    this.userService.updateUser(userId, modifiedFields).subscribe((response: any) => {
      // Aquí puedes manejar la respuesta del servidor si lo deseas
      console.log('Usuario actualizado con éxito');
    });*/
  }

  onCancel(): void {
    // Restablecer los valores del formulario a los valores originales
    //this.userData = { ...this.originalUserData };
  }

  editarUsuario() {
  }
  cambiarContrasena() {
  }
}

