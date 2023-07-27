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

    
   
  }
  
}
