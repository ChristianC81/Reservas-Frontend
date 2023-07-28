import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/service/usuario.service';// Reemplaza 'tu_servicio_de_usuarios' con el nombre correcto de tu servicio
import { Usuario } from '../modelo/Usuario';
import { Persona } from '../modelo/Persona';
import Swal from 'sweetalert2';
import { PersonaService } from 'src/service/persona.service';
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
  usuarioObt: Usuario = new Usuario();
  usuarioNew: Usuario;
  personaObt: Persona = new Persona();
  email: string = '';

  constructor(private userService: UsuarioService, private personaService: PersonaService) { }


  ngOnInit(): void {
    this.email = localStorage.getItem('emailUserLoged') as string;
    this.obtenerUsuario();
  }

  onCancel(): void {
    // Restablecer los valores del formulario a los valores originales
    //this.userData = { ...this.originalUserData };
  }

  obtenerUsuario() {
    this.userService.getUsuarioEmail(this.email).subscribe((user: Usuario) => {
      this.personaService.getUsuarioPersona(user.nombreUsuario).subscribe((persona: Persona) => {
        this.personaObt = persona;
        this.usuarioObt = user;      
        this.usuarioNew = {...user}; // Copia del usuario obtenido
      }, error => {
        console.error('Error al obtener la persona', error);
      });
    }, error => {
      console.error('Error al obtener el usuario', error);
    });
  }

  onSubmit(): void {
    this.usuarioNew = new Usuario();

    const userId = this.usuarioObt.idUsuario; 

     // Si los campos están vacíos, se mantienen los valores originales
     this.usuarioNew.nombreUsuario = this.nombreUsuario !== '' ? this.nombreUsuario : this.usuarioObt.nombreUsuario;
     this.usuarioNew.email = this.emailUser !== '' ? this.emailUser : this.usuarioObt.email;
     this.usuarioNew.contrasenia = this.contrasenia;
 
     this.usuarioNew.estado = true;
     this.usuarioNew.persona.idPersona = this.personaObt.idPersona;
     this.usuarioNew.rol.idRol = 2;

    this.userService.updateUser(userId, this.usuarioNew).subscribe((response: any) => {
      // Aquí puedes manejar la respuesta del servidor si lo deseas
      console.log('Usuario actualizado con éxito');
      Swal.fire('ACTUALIZACIÓN', 'Usuario actualizado con éxito', 'success');
      // Controlamos las nuevas asignaciones de los valores del almacenamiento local
      localStorage.setItem('emailUserLoged', this.usuarioNew.email);
      localStorage.setItem('username', this.usuarioNew.nombreUsuario);
      // Recargamos la página para que se muestren los nuevos valores en la barra de navegación
      location.reload();
    }, error => {
      console.error('Error al actualizar el usuario', error);
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

