import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/service/usuario.service';
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

  constructor(private userService: UsuarioService) { }

  async ngOnInit(){
    this.validateUserLoged();
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

  // motrar el nombre del usuario
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
}

